const DataSource = require("./DataSource");

module.exports = class Utils {
    static borders(dataSource = DataSource.prototype) {
        let frames = dataSource.getFrames();
        for (let frameId = 0; frameId < frames.length; frameId++) {
            let frame = frames[frameId];
            frame.unshift(this.repeat("=",dataSource.getFrameWidth()));
            frame.push(this.repeat("=",dataSource.getFrameWidth()));
            for (let i = 0; i < frame.length; i++) {
                while(frame[i].length < dataSource.getFrameWidth()) {
                    frame[i]+=" ";
                }
            }
            frame = frame.map(str => "|"+str+"|");
            frames[frameId] = frame;
        }
        return dataSource;
    }

    static repeat(symbol = "", times = 0) {
        let res = "";
        for (let i = 0; i < times; i++) {
            res += symbol;
        }
        return res;
    }
}