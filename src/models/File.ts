import fs from 'fs';
import readline from 'readline';
export class File {
  static async write(
    path: string,
    data: Buffer,
    onData?: (data: string) => void
  ): Promise<void> {
    const lines = data.toString().split('\n');
    const fileWriteStream = fs.createWriteStream(path, {
      encoding: 'utf-8',
      flags: 'w',
    });
    for (const line of lines) {
      console.log('in for');
      const ableToWrite = fileWriteStream.write(`${line}\n`, 'utf-8');
      if (onData) {
        onData(`${line}\n`);
      }
      if (!ableToWrite) {
        await new Promise((resolve) => {
          fileWriteStream.once('drain', resolve);
        });
      }
    }
    console.log('resolved');
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
        resolve(data);
      });
    });
  }
}
