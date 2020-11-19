import { CsvFileReader } from './CsvFileReader';
import { DataReader } from '../interfaces/DataReader';

export class MatrixReader {
  matrix: number[][] = [];

  constructor(public reader: DataReader) {}

  static fromCsv(filename: string): MatrixReader {
    return new MatrixReader(new CsvFileReader(filename));
  }

  async load(): Promise<void> {
    await this.reader.read();
    this.matrix = this.reader.data.map((row: string[]): number[] => {
      return row.map((number) => +number);
    });
  }
}
