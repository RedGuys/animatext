import DataSource from "./DataSource";
import DataOutput from "./DataOutput";

export default class Player {
    constructor(dataSource: DataSource);

    setFrameDuration(frameDuration: number): void;

    setFrameSkip(frameSkip: number): void;

    addDataOutput(dataOutput: DataOutput): number;

    play(): void;

    playOne(): void;

    loop(): void;
}