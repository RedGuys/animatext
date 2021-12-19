const EventEmitter = require("events");
const DataSource = require("./DataSource");
const DataOutput = require("./DataOutput");

module.exports = class Player extends EventEmitter.EventEmitter {
    _ds = DataSource.prototype;
    _frame = 0;
    _totalFrames = 0;
    _frames = [[""]];
    _state = 0;
    _frameWidth = 0;
    _frameDuration = 0;
    _frameSkip = 0;
    _do = [DataOutput.prototype];

    constructor(dataSource = DataSource.prototype) {
        super();
        this._ds = dataSource;
        this._do = [];
        this._frames = dataSource.getFrames();
        this._totalFrames = this._frames.length;
        this._frameWidth = dataSource.getFrameWidth();
        this._frameDuration = dataSource.getFrameDuration();
        this._frameSkip = dataSource.getFrameSkip();
    }

    addDataOutput(dataOutput) {
        this._do.push(dataOutput);
        return this._do.indexOf(dataOutput);
    }

    Play() {
        if(this._state === 0) {
            this._state = 1;
            this._update();
        }
    }

    _update() {
        if(this._state === 1) {
            if(this._frame >= this._totalFrames) {
                this._state = 0;
                return;
            }

            let lines = [];
            let frame = this._frames[this._frame];
            for (let data of frame) {
                while(data.length<this._frameWidth) data+=" ";
                lines.push(data);
            }
            this.emit('frameUpdate',lines.join("\n"));
            for (let doElement of this._do) {
                doElement.onUpdate(lines.join("\n"));
            }
            this._frame+=1+this._frameSkip;
            setTimeout((that) => that._update(),this._frameDuration,this);
        }
    }
}
