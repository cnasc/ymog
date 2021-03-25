const { readFileSync } = require("fs");

function makeLetters(scanlines) {
  const groupSize = scanlines.length / 26;
  let result = [];
  for (let i = 0; i < scanlines.length; i += groupSize) {
    result.push(scanlines.slice(i, i + groupSize));
  }
  return result;
}
const lines = readFileSync(`${__dirname}/letters.txt`).toString().split("\n");
// remove trailing newline, it isn't part of any of the letters
lines.pop();

const letters = makeLetters(lines);

module.exports = { letters };
