import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const generateRandomMatrix = (req: Request, res: Response) => {
  res.send('generate matrix');
};

export const uploadFormultiplication = (req: Request, res: Response) => {
  console.log(req.file);
  const writeStream = fs.createWriteStream(
    path.join(__dirname, '..', 'uploads', req.file.originalname),
    { flags: 'w' }
    );
  writeStream.write(req.file.buffer.toString());
  writeStream.end(());
};

export const getMultiplicationResult = (req: Request, res: Response) => {
  res.send('multiplication result!!!');
};
