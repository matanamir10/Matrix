import { Request, Response } from 'express';
import { File } from '../models/File';
import path from 'path';

export const generateRandomMatrix = async (req: Request, res: Response) => {
  const { rows, columns } = req.body;
  const PREFIX = ',';
  let data = ``;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 20; j++) {
      const rnd = Math.round(Math.random() * 1000);
      if (j + 1 === 20) {
        data = data.concat(`${rnd.toString()}`);
      } else {
        data = data.concat(`${rnd.toString()}${PREFIX}`);
      }
    }
    data = data.concat('\n');
  }
  console.log(Buffer.from(data));
  File.write(
    path.join(__dirname, '..', 'uploads', 'generate.txt'),
    Buffer.from(data)
  ).then(() => {
    //   TODO need to check why with timeout this working...
    console.log('downloading');
    res.download(
      path.join(__dirname, '..', 'uploads', 'generate.txt'),
      (err) => {
        console.log(err);
      }
    );
  });
  //   fs.createReadStream(
  //     path.join(__dirname, '..', 'uploads', 'generate.txt')
  //   ).pipe(res);
};
