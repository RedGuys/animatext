const DataSource = require("./DataSource");

module.exports = class Utils {
    static borders(dataSource = DataSource.prototype) {
        let frames = dataSource.getFrames();
        for (let frameId = 0; frameId < frames.length; frameId++) {
            let frame = frames[frameId];
            frame.unshift("=".repeat(dataSource.getFrameWidth()));
            frame.push("=".repeat(dataSource.getFrameWidth()));
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

    static calculateAverageColor(frame, x, y, ratioX, ratioY) {
        let avgColor = 0;
        let s = 0;
        for (let xx = x * ratioX; xx < (x + 1) * ratioX; xx++) {
            for (let yy = y * ratioY; yy < (y + 1) * ratioY; yy++) {
                try {
                    if (!isNaN(frame[yy][xx])) {
                        avgColor += frame[yy][xx];
                        s++;
                    }
                } catch (e) {}
            }
        }
        return avgColor / s;
    }

    static resizeFrame(frame, ratioX, ratioY) {
        let newFrame = Array.from({ length: Math.ceil(frame.length / ratioY) }, () => []);
        for (let x = 0; x < frame[0].length / ratioX; x++) {
            for (let y = 0; y < frame.length / ratioY; y++) {
                newFrame[y][x] = Utils.calculateAverageColor(frame, x, y, ratioX, ratioY);
            }
        }
        return newFrame;
    }
}