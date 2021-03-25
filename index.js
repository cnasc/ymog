#!/usr/bin/env node
const arg = require("arg");
const child_process = require("child_process");
const { letters } = require("./alphabet");

const args = arg({
  "--vertical": Boolean,
  "--emoji": String,
  "--fallback-emoji": String,
});

if (args["_"].length !== 1) {
  console.error("ERROR: pass one single word as an argument.");
  return;
}

const text = args["_"][0];
const mainEmoji = args["--emoji"] || ":monkey_face:";
const fallbackEmoji = args["--fallback-emoji"] || ":transparent-square:";
const direction = args["--vertical"] ? "vertical" : "horizontal";

let emojiText = [];
for (let char of text.toLowerCase()) {
  const index = char.charCodeAt(0);
  const letter = letters[index - 97];
  emojiText.push(letter);
}

function render(scanline) {
  result = "";
  for (let char of scanline) {
    if (char === " ") {
      result += fallbackEmoji;
    } else {
      result += mainEmoji;
    }
  }
  return result;
}

function addToClipboard(string) {
  return new Promise(function (resolve, reject) {
    const proc = child_process.spawn("pbcopy");
    proc.on("error", function (err) {
      reject(err);
    });
    proc.on("close", function () {
      resolve();
    });
    proc.stdin.write(string);
    proc.stdin.end();
  });
}

const rendition = {
  horizontal: (emojiText) => {
    const letterSize = emojiText[0].length;
    const lines = [];
    for (let i = 0; i < letterSize; ++i) {
      let line = "";
      for (let letter of emojiText) {
        line += render(letter[i]);
        line += ":transparent-square:";
      }
      lines.push(line);
    }
    return lines.join("\n");
  },
  vertical: (emojiText) => {
    const lines = [];
    for (let letter of emojiText) {
      for (let line of letter) {
        lines.push(render(line));
      }
    }
    return lines.join("\n");
  },
};

const output = rendition[direction](emojiText);
addToClipboard(output)
  .then(() =>
    console.log("Copied emoji text into clipboard. Paste into slack!")
  )
  .catch(() => {
    console.error(
      `ERROR: Could not copy emojified version of ${text} to clipboard. Womp.`
    );
  });
