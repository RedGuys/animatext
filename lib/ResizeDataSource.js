const DataSource = require("./DataSource");

module.exports = class ResizeDataSource extends DataSource {

    _ds = DataSource.prototype;
    _options = {ratioX:1,ratioY:1,maxX:-1,maxY:-1}

    constructor(original, options = {ratioX:1,ratioY:1,maxX:-1,maxY:-1}) {
        super();
        this._ds = original;
        this._options = options;
        if(this._options.ratioX == null) this._options.ratioX = 1;
        if(this._options.ratioY == null) this._options.ratioY = 1;
        if(this._options.maxX == null) this._options.maxX = -1;
        if(this._options.maxY == null) this._options.maxY = -1;
    }

    async parse() {
        return await this._ds.parse();
    }

    getFrameDuration() {
        return this._ds.getFrameDuration();
    }

    getFrameSkip() {
        return this._ds.getFrameSkip();
    }

    getFrames() {
        let frames = this._ds.getFrames();
        let width = frames[0][0].length;
        let height = frames[0].length;

        let ratioX = this._options.ratioX;
        let ratioY = this._options.ratioY;
        let maxX = this._options.maxX;
        let maxY = this._options.maxY;

        if(maxX !== -1) {
            ratioX = maxX / width;
        }
        if(maxY !== -1) {
            ratioY = maxY / height;
        }

        let newFrames = [];
        for(let frame of frames) {
            let newFrame = [];
            for(let y = 0; y < height; y += ratioY) {
                let row = "";
                for(let x = 0; x < width; x += ratioX) {
                    if(frame[Math.floor(y)][Math.floor(x)] == null) {
                        row += " ";
                        continue;
                    }
                    row += frame[Math.floor(y)][Math.floor(x)];
                }
                newFrame.push(row);
            }
            newFrames.push(newFrame);
        }
        return newFrames;
    }

    setFrames(frames) {
        return this._ds.setFrames(false);
    }

    getFrameWidth() {
        return this._ds.getFrameWidth();
    }

    spaces(num) {
        return this._ds.spaces(num);
    }
}