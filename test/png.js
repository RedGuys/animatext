const Animatext = require("..");
const fs = require("fs");

(async() => {
    let dat = new Animatext.PngDataSource(
        fs.readFileSync("test/heart.png"),
        {frameDuration: 100, frameSkip: 0,maxWidth:100,maxHeight:40});
        await dat.parse();
    let player = new Animatext.Player(
        dat
    );

    player.addDataOutput(new Animatext.ConsoleDataOutput());
    player.Play();
})();