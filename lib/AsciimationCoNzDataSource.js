const DataSource = require("./DataSource");

module.exports = class AsciimationCoNzDataSource extends DataSource {

    _frames = [];
    _options = {};

    constructor(string="",frameHeight = 15, options = {frameDuration:500,frameSkip:0}) {
        super();
        this._options = options;
        let line = 0;
        let frame = [];
        let frameRepeat = 1;
        for (let string1 of string.split("\\n").join("\n").split("\n")) {
            if(line===frameHeight) {
                for (let i = 0; i < frameRepeat; i++) {
                    this._frames.push(frame);
                }
                frame = [];
                line = 0;
            }
            if(line===0) {
                let match = /^\d+/gm.exec(string1);
                if(match == null) frameRepeat = 1;
                else {
                    let rep = match[0];
                    string1 = string1.substring(rep.length);
                    frameRepeat = parseInt(rep);
                }
            }
            frame.push(string1);
            line++;
        }
    }

    getFrameDuration() {
        return this._options.frameDuration;
    }

    getFrameSkip() {
        return this._options.frameSkip;
    }

    getFrames() {
        return this._frames;
    }

    getFrameWidth() {
        return 25;
    }

    setFrames(frames) {
        this._frames = frames;
    }
}