import fs from 'fs';
import { resolve } from 'path';
import readline from 'readline';
export class File {
  static async write(path: string, data: Buffer): Promise<void> {
    const lines = data.toString().split('\n');
    const fileWriteStream = fs.createWriteStream(path, {
      encoding: 'utf-8',
      flags: 'w',
    });
    fileWriteStream.on('close', () => {
      console.log('now is close');
      return Promise.resolve();
    });
    for (const line of lines) {
      console.log('in for');
      const ableToWrite = fileWriteStream.write(`${line}\n`, 'utf-8');
      console.log('able to write', ableToWrite);
      if (!ableToWrite) {
        await new Promise((resolve) => {
          fileWriteStream.once('drain', resolve);
        });
      }
    }
    console.log('resolved');
    // fileWriteStream.close();
  }
  static read(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let data = '';
      const readStream = fs.createReadStream(path, { encoding: 'utf-8' });
      const rl = readline.createInterface({
        input: readStream,
      });
      rl.on('line', function (line) {
        data = data.concat(line).concat('\n');
      });
      readStream.on('error', (err) => {
        reject(err);
      });
      rl.on('close', () => {
        console.log('closed');
        resolve(data);
      });
    });
  }
}
