const DataSource = require("./DataSource");
const gif = require("omggif");
const {Utils} = require("./index");

module.exports = class GifDataSource extends DataSource {

    _frames = [];
    _options = {};

    constructor(buffer, options = {ratioX:2,ratioY:2,frameDuration:500,frameSkip:0,maxHeight:-1,maxWidth:-1}) {
        super();
        this._options = options;
        if(!Number.isInteger(this._options.ratioX)) this._options.ratioX = 2;
        if(!Number.isInteger(this._options.ratioY)) this._options.ratioY = 2;
        if(!Number.isInteger(this._options.frameDuration)) this._options.frameDuration = 500;
        if(!Number.isInteger(this._options.frameSkip)) this._options.frameSkip = 0;
        if(!Number.isInteger(this._options.maxHeight)) this._options.maxHeight = -1;
        if(!Number.isInteger(this._options.maxWidth)) this._options.maxWidth = -1;
        let g = new gif.GifReader(buffer);
        let frames = this.extractFrames(g);
        let newFrames = this.resizeFrames(frames);
        this._frames = this.convertFramesToStrings(newFrames);
    }

    extractFrames(g) {
        let frames = [];
        for (let frameID = 0; frameID < g.numFrames(); frameID++) {
            let frame = [];
            let row = [];
            let rowLen = 0;
            let bytes = [];
            g.decodeAndBlitFrameBGRA(frameID, bytes);
            for (let i = 0; i < bytes.length; i += 4) {
                if (rowLen >= g.width) {
                    frame.push(row);
                    row = [];
                    rowLen = 0;
                }
                row.push((bytes[i] + bytes[i + 1] + bytes[i + 2]) / 3);
                rowLen++;
            }
            frames.push(frame);
        }
        return frames;
    }

    // noinspection DuplicatedCode
    resizeFrames(frames) {
        let newFrames = [];
        for (let frame of frames) {
            let ratioY = this.calculateRatio(frame.length, this._options.maxHeight, this._options.ratioY);
            let ratioX = this.calculateRatio(frame[0].length, this._options.maxWidth, this._options.ratioX);
            let newFrame = Utils.resizeFrame(frame, ratioX, ratioY);
            newFrames.push(newFrame);
        }
        return newFrames;
    }

    calculateRatio(length, maxLength, defaultRatio) {
        if (maxLength === -1) {
            return defaultRatio;
        } else {
            return length > maxLength ? Math.ceil(length / maxLength) : 1;
        }
    }

    convertFramesToStrings(frames) {
        return frames.map(frame => frame.map(row => row.map(this.parsePixel.bind(this)).join("")));
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
        return this._options.width;
    }

    setFrames(frames) {}

    parsePixel(data) {
        if(data<50)
            return "-";
        else if(data<100)
            return "+";
        else if(data<125)
            return "*";
        else if(data<150)
            return "%";
        else if(data<200)
            return "@";
        else if(data<225)
            return "№"
        else
            return "#";
    }
}