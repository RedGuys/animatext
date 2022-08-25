# Animatext
Little library for text animations. Animate Text.

## Installation
```shell
npm install git+https://github.com/RedGuys/animatext.git
```

## Usage

Plays gif file in terminal.

```javascript
const Animatext = require("animatext");
const fs = require("fs");

let player = new Animatext.Player(
    new animatext.GifDataSource(
        fs.readFileSync("test/75px-Nature.gif"),
        {frameDuration: 100, frameSkip: 0,maxWidth:200,maxHeight:24})
);

player.addDataOutput(new animatext.ConsoleDataOutput());
player.Loop();
player.Play();
```

### Available Data Sources
* GifDataSource
* AsciiCoUkDataSource
* AsciimationCoNzDataSource
* EndTitlesGeneratorDataSource
* TestDataSource

### Available Data Outputs
* ConsoleDataOutput
* DiscordMessageDataOutput