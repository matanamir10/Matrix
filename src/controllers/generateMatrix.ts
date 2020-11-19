import { Request, Response } from 'express';

export const generateRandomMatrix = async (req: Request, res: Response) => {
  const { rows, columns } = req.body;
  const PREFIX = ',';
  for (let i = 0; i < rows; i++) {
    let data = ``;
    for (let j = 0; j < columns; j++) {
      const rnd = Math.round(Math.random() * 1000);
      if (j + 1 === columns) {
        data = data.concat(`${rnd.toString()}`);
      } else {
        data = data.concat(`${rnd.toString()}${PREFIX}`);
      }
    }
    data = data.concat('\n');
    res.write(data);
  }
  res.end();
};
