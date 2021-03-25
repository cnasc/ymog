# ymog

Turn text into a wall of slack emojis

## Usage

1. clone repo
2. `yarn install`
3. `./index.js neat --emoji :hype:`
4. paste to slack

You might find it helpful to make a shell alias so you can easily access this from everywhere. Add something like this to your {ba,z}shrc:

```sh
alias ymog="/path/to/ymog/index.js"
```

### Options

- `--vertical`: render the text vertically instead of horizontally.
- `--emoji <slack emoji name>`: choose which emoji to build letters out of.
- `--fallback-emoji <slack emoji name>`: choose which emoji is the whitespace.
