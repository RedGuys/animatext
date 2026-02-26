import DataSource from "./DataSource";

export default class AsciiLiveDataSource extends DataSource {
    constructor(name: string, options?: {frameDuration?: number, frameSkip?: number});
}