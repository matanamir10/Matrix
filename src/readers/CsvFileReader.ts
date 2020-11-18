import fs from 'fs';
import { DataReader } from '../interfaces/DataReader';
import { File } from '../models/File';

export class CsvFileReader implements DataReader {
  data: string[][] = [];

  constructor(public filename: string) {}

  async read(): Promise<void> {
    const data = await File.read(this.filename);
    //   console.log('the data', data.split('\n').pop());
    const transformed = data.split('\n');
    transformed.pop();
    console.log('transforme', transformed);
    this.data = transformed.map((row: string): string[] => {
      return row.split(',');
    });
  }
}
