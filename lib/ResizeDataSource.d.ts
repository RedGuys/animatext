import DataSource from "./DataSource";

export default class ResizeDataSource extends DataSource {
    constructor(original: DataSource, options?: {ratioX?: number, ratioY?: number, maxX?: number, maxY?: number});
}