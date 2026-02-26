import DataSource from "./DataSource";
import { GifBinary, GifReader } from "omggif";

export default class GifDataSource extends DataSource {
    constructor(buffer: GifBinary, options?: {ratioX?: number, ratioY?: number, frameDuration?: number, frameSkip?: number, maxHeight?: number, maxWidth?: number});

    extractFrames(gifReader: GifReader): string[][];

    resizeFrames(frames: string[][]): string[][];

    calculateRatio(length: number, maxLength: number, defaultRatio: number): number;

    convertFramesToStrings(frames: string[][]): string[];

    parsePixel(level: number): string;
}