const Animatext = require("..");
const fs = require("fs");

let player = new Animatext.Player(
    new Animatext.GifDataSource(
        fs.readFileSync("test/cat.gif"),
        {frameDuration: 100, frameSkip: 0,maxWidth:230,maxHeight:50})
);

player.addDataOutput(new Animatext.ConsoleDataOutput());
player.Loop();
player.Play();