import fs from 'fs';
import { DataReader } from '../interfaces/DataReader';
import { File } from '../models/File';

export class CsvFileReader implements DataReader {
  data: string[][] = [];

  constructor(public filename: string) {}

  async read(): Promise<void> {
    const data = await File.read(this.filename);
    this.data = data.split('\n').map((row: string): string[] => {
      return row.split(',');
    });
  }
}
