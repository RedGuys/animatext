export default class DataSource {
    parse(): Promise<void>;

    getFrameDuration(): number;

    getFrameSkip(): number;

    getFrames(): string[][];

    setFrames(frames: string[][]): void;

    getFrameWidth(): number;

    hasUpdates(): boolean;

    spaces(num: number): string;
}