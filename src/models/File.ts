import fs from 'fs';
import readline from 'readline';
export class File {
  static async write(path: string, data: Buffer): Promise<void> {
    console.log(path);
    const lines = data.toString().split('\n');
    const fileWriteStream = fs.createWriteStream(path, {
      encoding: 'utf-8',
      flags: 'w',
    });
    for (const line of lines) {
      console.log(line);
      const ableToWrite = fileWriteStream.write(line);
      if (!ableToWrite) {
        await new Promise((resolve) => {
          fileWriteStream.once('drain', resolve);
        });
      }
    }
  }
  static read(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let data = '';
      const readStream = fs.createReadStream(path, { encoding: 'utf-8' });
      const rl = readline.createInterface({
        input: readStream,
      });
      rl.on('line', function (line) {
        console.log(line);
        data = data.concat(line).concat('\n');
        //Do your stuff ...
        //Then write to outstream
        // rl.write(cubestuff);
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
