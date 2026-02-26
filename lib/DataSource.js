module.exports = class DataSource {
    constructor() {};

    // Async parsing function for some data sources
    async parse() {};

    getFrameDuration() {};
    getFrameSkip() {};
    getFrames() {};
    // noinspection JSUnusedGlobalSymbols
    setFrames(frames) {};
    getFrameWidth() {};
    hasUpdates() {return false;};

    spaces(num) {
        return " ".repeat(num);
    }
}
