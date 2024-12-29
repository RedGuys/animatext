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
    _loop = false;
    _do = [DataOutput.prototype];

    constructor(dataSource = DataSource.prototype) {
        super();
        this._ds = dataSource;
        this._do = [];
        this._recalc();
    }

    setFrameDuration(frameDuration) {
        this._frameDuration = frameDuration;
    }

    setFrameSkip(frameSkip) {
        this._frameSkip = frameSkip;
    }

    addDataOutput(dataOutput) {
        this._do.push(dataOutput);
        return this._do.indexOf(dataOutput);
    }

    Play() {
        if (this._state === 0) {
            this._state = 1;
            this._update();
        } else if (this._state === 1) {
            this._frame = 0;
        }
    }

    // noinspection JSUnusedGlobalSymbols
    PlayOne() {
        if (this._state === 0) {
            this._update();
        }
    }

    Loop() {
        this._loop = !this._loop;
    }

    _recalc() {
        this._frames = this._ds.getFrames();
        this._totalFrames = this._frames.length;
        this._frameWidth = this._ds.getFrameWidth();
        this._frameDuration = this._ds.getFrameDuration();
        this._frameSkip = this._ds.getFrameSkip();
    }

    _update() {
        if(this._ds.hasUpdates()) {
            this._recalc();
        }

        if(this._totalFrames === 0) {
            if(this._loop) {
                setTimeout((that) => that._update(), this._frameDuration, this);
            }
            return;
        }

        if (this._frame >= this._totalFrames) {
            if(this._loop) {
                this._frame = 0;
            } else {
                this._state = 0;
                return;
            }
        }

        let lines = [];
        let frame = this._frames[this._frame];
        for (let data of frame) {
            while (data.length < this._frameWidth) data += " ";
            lines.push(data);
        }
        this.emit('frameUpdate', lines.join("\n"));
        for (let doElement of this._do) {
            doElement.onUpdate(lines.join("\n"));
        }
        this._frame += 1 + this._frameSkip;
        if (this._state === 1) {
            setTimeout((that) => that._update(), this._frameDuration, this);
        }
    }
}
