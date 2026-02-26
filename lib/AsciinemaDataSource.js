const DataSource = require("./DataSource");

module.exports = class AsciinemaDataSource extends DataSource {

    _frames = [];
    _options = {};

    constructor(animation = "", options = {}) {
        super();
        if(!Number.isInteger(options.frameDuration)) options.frameDuration = 1000;

        let fileOptions = animation.split("\n")[0];
        animation = animation.split("\n").slice(1).filter(line => line.length > 0);
        fileOptions = JSON.parse(fileOptions);
        this._options.width = fileOptions.width;
        this._options.frameDuration = options.frameDuration;

        let frameDuration = options.frameDuration/1000;
        let lastTiming = 0;
        let totalTiming = 0;
        let frames = [];
        let frame = [""];
        for (let line of animation) {
            let current = parseFloat(JSON.parse(line)[0]);
            let timing = current - lastTiming;
            if (totalTiming > frameDuration) {
                frames.push(frame);
                totalTiming -= frameDuration;
            }
            //build a line of text from a frame
            let text = frame.join("[39m");
            //append new data
            text += JSON.parse(line)[2];
            //split to frames and save only last
            let rawFrames = text.split("[2J");
            let rawLastFrame = rawFrames[rawFrames.length-1];
            //split frame by lines
            frame = rawLastFrame.split("[39m").map(line => line.replaceAll("\n","").replaceAll("\r",""));

            totalTiming += timing;
            lastTiming = current;
        }
        this._frames = frames;
    }

    getFrameDuration() {
        return this._options.frameDuration;
    }

    getFrameSkip() {
        return 0;
    }

    getFrames() {
        return this._frames;
    }

    getFrameWidth() {
        return this._options.width;
    }
}