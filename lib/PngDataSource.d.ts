import DataSource from "./DataSource";

export default class PngDataSource extends DataSource {
    constructor(buffer: BufferSource, options?: {ratioX?: number, ratioY?: number, maxHeight?: number, maxWidth?: number});

    extractFrames(data: {data: number[], width: number}): number[][];

    resizeFrames(frames: number[][]): number[][];

    calculateRatio(length: number, maxLength: number, defaultRatio: number): number;

    convertFramesToStrings(frames: number[][]): string[];

    parsePixel(data: number): string;
}