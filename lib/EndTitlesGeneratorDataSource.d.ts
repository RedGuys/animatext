import DataSource from "./DataSource";

export default class EndTitlesGeneratorDataSource extends DataSource {
    constructor(lines?: string[], options?: {height?: number, width?: number, frameDuration?: number, frameSkip?: number});

    fixArrayLength(array: string[], length: number): string[];
}