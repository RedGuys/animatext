import DataOutput from "./DataOutput";
import { Message } from "discord.js";

export default class DiscordMessageDataOutput extends DataOutput {
    constructor(message: Message);
}