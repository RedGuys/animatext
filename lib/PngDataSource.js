const DataSource = require("./DataSource");
const png = require("pngjs");

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
        let options = this._options;
        let parsePixel = this.parsePixel;
        let a = this;
        return new Promise((resolve, reject) => {
            new png.PNG({ filterType: 6 }).parse(this._buffer, function (error, data) {
                let frames = [];

                let frame = [];
                let row = [];
                let rowLen = 0;
                let bytes = data.data;
                for (let i = 0; i < data.data.length; i+=4) {
                    if(rowLen>=data.width) {
                        frame.push(row);
                        row = [];
                        rowLen = 0;
                    }
                    row.push((bytes[i]+bytes[i+1]+bytes[i+2])/3)
                    rowLen++;
                }
                frames.push(frame);
            
                
                let newFrames = [];

                for (let frame of frames) {
                    let ratioY;
                    if(options.maxHeight===-1) {
                        ratioY = options.ratioY;
                    } else {
                        if(frame.length>options.maxHeight) {
                            ratioY = Math.ceil(frame.length/options.maxHeight);
                        } else {
                            ratioY = 1;
                        }
                    }

                    let ratioX;
                    if(options.maxWidth===-1) {
                        ratioX = options.ratioX;
                    } else {
                        if(frame[0].length>options.maxWidth) {
                            ratioX = Math.ceil(frame[0].length/options.maxWidth);
                        } else {
                            ratioX = 1;
                        }
                    }

                    let newFrame = [];
                    for (let i = 0; i < frame.length/ratioY; i++) {
                        newFrame[i] = [];
                    }

                    for (let x = 0; x < frame[0].length/ratioX; x++) {
                        for (let y = 0; y < frame.length/ratioY; y++) {
                            let avgColor = 0;
                            let s = 0;
                            for (let xx = x*ratioX; xx < (x+1)*ratioX; xx++) {
                                for (let yy = y*ratioY; yy < (y+1)*ratioY; yy++) {
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
                            r+=parsePixel(rowKey);
                        }
                        frameStr.push(r);
                    }
                    a._frames.push(frameStr);
                }
                resolve();
            });
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