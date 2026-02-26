const DataSource = require("./DataSource");

module.exports = class EndTitlesGeneratorDataSource extends DataSource {

    _frames = [];
    _options = {};

    constructor(lines = [""], options = {}) {
        super();
        this._options = options;
        if(!Number.isInteger(this._options.height)) this._options.height = 5;
        if(!Number.isInteger(this._options.width)) this._options.width = 0;
        if(!Number.isInteger(this._options.frameDuration)) this._options.frameDuration = 500;
        if(!Number.isInteger(this._options.frameSkip)) this._options.frameSkip = 0;
        for (let line of lines) {
            if(line.length>options.width) {
                options.width = line.length;
            }
        }
        for (let i = 0; i < options.height; i++) {
            lines.unshift("");
        }

        while (lines.length>0) {
            let arrayCopy = lines.slice(0,options.height)
            arrayCopy = arrayCopy.map(line => this.spaces(Math.floor((options.width-line.length)/2)) + line);
            this._frames.push(this.fixArrayLength(arrayCopy,options.height));
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