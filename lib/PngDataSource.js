const DataSource = require("./DataSource");
const png = require("pngjs");
const {Utils} = require("./index");

module.exports = class PngDataSource extends DataSource {

    _frames = [];
    _options = {};
    _buffer;

    constructor(buffer, options = {ratioX:2,ratioY:2,maxHeight:-1,maxWidth:-1}) {
        super();
        this._options = options;
        this._buffer = buffer;
    }

    parse() {
        return new Promise((resolve, reject) => {
            new png.PNG({ filterType: 6 }).parse(this._buffer, (error, data) => {
                if (error) {
                    reject(error);
                    return;
                }
                let frames = this.extractFrames(data);
                let newFrames = this.resizeFrames(frames);
                this._frames = this.convertFramesToStrings(newFrames);
                resolve();
            });
        });
    }

    extractFrames(data) {
        let frames = [];
        let frame = [];
        let row = [];
        let rowLen = 0;
        let bytes = data.data;
        for (let i = 0; i < data.data.length; i += 4) {
            if (rowLen >= data.width) {
                frame.push(row);
                row = [];
                rowLen = 0;
            }
            row.push((bytes[i] + bytes[i + 1] + bytes[i + 2]) / 3);
            rowLen++;
        }
        frames.push(frame);
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