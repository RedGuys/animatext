# Animatext

Animatext is a small library for creating text animations. It provides a variety of data sources to generate animations from different types of input, such as GIFs, PNGs, and ASCII art. The animations can be outputted to various platforms, including the console and Discord messages.

## Installation

You can install Animatext using npm:

```shell
npm install animatext
```

## Usage

Here is an example of how to use Animatext to play a GIF file in the terminal:

```javascript
const Animatext = require("animatext");
const fs = require("fs");

let player = new Animatext.Player(
    new animatext.GifDataSource(
        fs.readFileSync("test/rainbowspiralplz.gif"),
        {frameDuration: 100, frameSkip: 0,maxWidth:200,maxHeight:24})
);

player.addDataOutput(new animatext.ConsoleDataOutput());
player.Loop();
player.Play();
```

## Data Sources

Animatext supports a variety of data sources for generating animations:

- `GifDataSource`: Generates animations from GIF files.
- `PngDataSource`: Generates animations from PNG files.
- `AsciiCoUkDataSource`: Generates animations from ASCII art.
- `AsciimationCoNzDataSource`: Generates animations from ASCII animations.
- `AsciinemaDataSource`: Generates animations from Asciinema recordings.
- `TestDataSource`: Generates a test animation.
- `EndTitlesGeneratorDataSource`: Generates end titles for animations.

## Data Outputs

Animatext supports outputting animations to the following platforms:

- `ConsoleDataOutput`: Outputs animations to the console.
- `DiscordMessageDataOutput`: Outputs animations to a Discord message.

## Utilities

Animatext also includes a `Utils` class with utility functions for working with animations:

- `borders(dataSource)`: Adds borders to an animation.
- `repeat(symbol, times)`: Repeats a symbol a specified number of times.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## Documentation

### Player

The `Player` class is responsible for managing the animation playback. It extends the `EventEmitter`.

#### Constructor

The `Player` class constructor takes one argument:

- `dataSource`: An instance of a class that extends the `DataSource` class. This object provides the frames of the animation.

#### Methods

##### addDataOutput(dataOutput)

This method is used to add a data output to the player. The `dataOutput` argument should be an instance of a class that extends the `DataOutput` class. This object will be used to output the frames of the animation. The method returns the index of the added data output.

##### Play()

This method starts the animation playback. If the animation is already playing, it resets the animation to the first frame.

##### PlayOne()

This method plays one frame of the animation. If the animation is not currently playing, it starts the animation.

##### Loop()

This method toggles the loop mode of the animation. If loop mode is enabled, the animation will start over from the first frame after reaching the last frame.

#### Events

##### frameUpdate

This event is emitted every time the current frame of the animation is updated. The event handler function receives one argument, which is a string representation of the current frame.

### DataSource

The `DataSource` class is an abstract base class that defines the interface for data sources in the Animatext library. A data source provides the frames of an animation.

#### Methods

##### parse()

This is an asynchronous method that is used for parsing data in some data sources. It should be overridden in subclasses that require asynchronous parsing.

##### getFrameDuration()

This method should return the duration of each frame in the animation in milliseconds. It should be overridden in subclasses.

##### getFrameSkip()

This method should return the number of frames to skip after each frame in the animation. It should be overridden in subclasses.

##### getFrames()

This method should return an array of frames of the animation. Each frame should be an array of strings, where each string represents a line of text in the frame. It should be overridden in subclasses.

##### setFrames(frames)

This method is used to set the frames of the animation. The `frames` argument should be an array of frames, where each frame is an array of strings. It should be overridden in subclasses.

##### getFrameWidth()

This method should return the width of each frame in the animation in characters. It should be overridden in subclasses.

##### spaces(num)

This method returns a string of spaces. The `num` argument specifies the number of spaces. This method is used internally by some data sources to generate spaces.

#### Example

```javascript
const DataSource = require("./DataSource");

class MyDataSource extends DataSource {
    constructor() {
        super();
        // Initialization code...
    }

    getFrameDuration() {
        // Return the frame duration...
    }

    getFrameSkip() {
        // Return the frame skip...
    }

    getFrames() {
        // Return the frames...
    }

    setFrames(frames) {
        // Set the frames...
    }

    getFrameWidth() {
        // Return the frame width...
    }
}
```

### DataOutput

The `DataOutput` class is an abstract base class that defines the interface for data outputs in the Animatext library. A data output is responsible for outputting the frames of an animation.

#### Methods

##### onUpdate(text)

This method is called when the current frame of the animation is updated. The `text` argument is a string representation of the current frame. This method should be overridden in subclasses to provide the functionality required for the specific data output.

#### Example

```javascript
const DataOutput = require("./DataOutput");

class MyDataOutput extends DataOutput {
    constructor() {
        super();
        // Initialization code...
    }

    onUpdate(text) {
        // Output the text...
    }
}
```