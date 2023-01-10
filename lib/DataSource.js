module.exports = class DataSource {
    constructor() {};

    // Async parsing function for some data sources
    async parse() {};

    getFrameDuration() {};
    getFrameSkip() {};
    getFrames() {};
    setFrames(frames) {};
    getFrameWidth() {};

    spaces(num) {
        let spaces = "";
        for (let i = 0; i < num; i++) {
            spaces+=" ";
        }
        return spaces;
    }
}
