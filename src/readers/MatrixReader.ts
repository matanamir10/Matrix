import { CsvFileReader } from './CsvFileReader';
import { DataReader } from '../interfaces/DataReader';

export class MatrixReader {
  static fromCsv(filename: string): MatrixReader {
    return new MatrixReader(new CsvFileReader(filename));
  }

  //   matches: MatchData[] = [];

  constructor(public reader: DataReader) {}

  load(): void {
    this.reader.read();
    // this.matches = this.reader.data.map(
    //   (row: string[]): MatchData => {
    //     return [
    //       dateStringToDate(row[0]),
    //       row[1],
    //       row[2],
    //       parseInt(row[3]),
    //       parseInt(row[4]),
    //       row[5] as MatchResult,
    //       row[6],
    //     ];
    //   }
    // );
  }
}
