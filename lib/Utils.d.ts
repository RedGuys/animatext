import DataSource from "./DataSource";

export default class Utils {
    static borders(dataSource: DataSource): DataSource;

    static calculateAverageColor(frame: number[][], x: number, y: number, ratioX: number, ratioY: number): number;

    static resizeFrame(frame: number[][], ratioX: number, ratioY: number): number[][];
}