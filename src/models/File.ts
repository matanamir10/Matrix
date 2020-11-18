import fs from 'fs';

export class File {
  static async write(path: string, data: Buffer): Promise<void> {
    console.log(path);
    const lines = data.toString().split('\n');
    const fileWriteStream = fs.createWriteStream(path, { encoding: 'utf8' });
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
}
