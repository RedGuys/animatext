const Lib = require("..");

(async() => {
    let dat = new Lib.AsciiLiveDataSource("can-you-hear-me");
    await dat.parse();
    let player = new Lib.Player(dat);
    player.addDataOutput(new Lib.ConsoleDataOutput());
    player.Loop();
    player.Play();
})();