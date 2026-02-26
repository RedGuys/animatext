const DataSource = require("./DataSource");

module.exports = class AsciiCoUkDataSource extends DataSource {

    _frames = [];
    _options = {};

    constructor(frames=[""], options = {}) {
        super();
        this._options = options;
        if(!Number.isInteger(this._options.frameDuration)) this._options.frameDuration = 500;
        if(!Number.isInteger(this._options.frameSkip)) this._options.frameSkip = 0;
        this._frames = frames.map(str => str.split("\n"));
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
        return this._frames[0][0].length;
    }

    setFrames(frames) {
        this._frames = frames;
    }
}