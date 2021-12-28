const DataSource = require("./DataSource");
const gif = require("omggif");

module.exports = class GifDataSource extends DataSource {

    _frames = [];
    _options = {};

    constructor(buffer, options = {ratioX:2,ratioY:2,frameDuration:500,frameSkip:0}) {
        super();
        this._options = options;
        let g = new gif.GifReader(buffer);
        let frames = [];

        for (let frameID = 0; frameID < g.numFrames(); frameID++) {
            let frame = [];
            let row = [];
            let rowLen = 0;
            let bytes = [];
            g.decodeAndBlitFrameBGRA(frameID,bytes);
            for (let i = 0; i < bytes.length; i+=4) {
                if(rowLen>=g.width) {
                    frame.push(row);
                    row = [];
                    rowLen = 0;
                }
                row.push((bytes[i]+bytes[i+1]+bytes[i+2])/3)
                rowLen++;
            }
            frames.push(frame);
        }
        
        let newFrames = [];

        for (let frame of frames) {
            let newFrame = [];
            for (let i = 0; i < frame.length/this._options.ratioY; i++) {
                newFrame[i] = [];
            }

            for (let x = 0; x < frame[0].length/this._options.ratioX; x++) {
                for (let y = 0; y < frame.length/this._options.ratioY; y++) {
                    let avgColor = 0;
                    let s = 0;
                    for (let xx = x*this._options.ratioX; xx < (x+1)*this._options.ratioX; xx++) {
                        for (let yy = y*this._options.ratioY; yy < (y+1)*this._options.ratioY; yy++) {
                            try {
                                if(!isNaN(frame[yy][xx])) {
                                    avgColor += frame[yy][xx];
                                    s++;
                                }
                            } catch (e) {}
                        }
                    }
                    newFrame[y][x] = avgColor/s;
                }
            }
            newFrames.push(newFrame);
        }

        for (let frame of newFrames) {
            let frameStr = [];
            for (let row of frame) {
                let r = "";
                for (let rowKey of row) {
                    r+=this.parsePixel(rowKey);
                }
                frameStr.push(r);
            }
            this._frames.push(frameStr);
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