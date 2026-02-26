const DataOutput = require("./DataOutput");

module.exports = class ConsoleDataOutput extends DataOutput {

    _message;

    constructor(message) {
        super();
        if(message === undefined) throw new Error("Message undefined");
        this._message = message;
    }

    onUpdate(text) {
        let emb = new (require("discord.js").MessageEmbed)().setDescription("```"+text+"```");
        this._message.edit({embeds:[emb]});
    }
}