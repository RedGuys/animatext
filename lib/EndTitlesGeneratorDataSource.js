const DataSource = require("./DataSource");

module.exports = class EndTitlesGeneratorDataSource extends DataSource {

    _frames = [];
    _options = {};

    constructor(lines = [""], options = {height:5,width:0,frameDuration:500,frameSkip:0}) {
        super();
        this._options = options;
        for (let line of lines) {
            if(line.length>options.width) {
                options.width = line.length;
            }
        }
        for (let i = 0; i < options.height; i++) {
            lines.unshift("");
        }

        while (lines.length>0) {
            let arrcopy = lines.slice(0,options.height)
            arrcopy = arrcopy.map(line => this.spaces(Math.floor((options.width-line.length)/2)) + line);
            let newarr = this.fixArrayLength(arrcopy,options.height);
            this._frames.push(newarr);
            lines.shift();
        }
        this._frames.push(this.fixArrayLength([],options.height));
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


    setFrames(frames) {
        this._frames = frames;
    }

    fixArrayLength(array = [], length) {
        let newArray = array.copyWithin(0,0);
        while(newArray.length < length) {
            newArray.push("");
        }
        return newArray;
    }
}