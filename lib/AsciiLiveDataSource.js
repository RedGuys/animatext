const DataSource = require("./DataSource");
const axios = require("axios");

module.exports = class AsciiLiveDataSource extends DataSource {

    _frames = [];
    _options = {};
    _name = "";
    _updated = false;

    constructor(name, options = {}) {
        super();
        this._options = options;
        if(!Number.isInteger(this._options.frameDuration)) this._options.frameDuration = 500;
        if(!Number.isInteger(this._options.frameSkip)) this._options.frameSkip = 0;
        this._name = name;
    }

    async parse() {
        let response = await axios.get(`https://ascii.live/${this._name}`,{
            headers: {
                "User-Agent": "Fake curl request"
            },
            responseType: "stream"
        });
        response.data.on("data", (chunk) => {
            chunk = chunk.toString();
            this._frames.push(chunk.split("\n"));
            this._updated = true;
        });
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
        if(this._frames.length === 0) return 0;
        if(this._frames[0].length === 0) return 0;
        return this._frames[0][0].length;
    }

    setFrames(frames) {
        this._frames = frames;
    }

    hasUpdates() {
        if (this._updated) {
            this._updated = false;
            return true;
        }
        return false;
    }
}