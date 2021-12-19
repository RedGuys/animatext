const DataOutput = require("./DataOutput");

module.exports = class ConsoleDataOutput extends DataOutput {
    onUpdate(text) {
        console.clear();
        console.log(text);
    }
}