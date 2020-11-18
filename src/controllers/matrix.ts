import { Request, Response } from 'express';
import path from 'path';
import { File } from '../models/File';

export const generateRandomMatrix = (req: Request, res: Response) => {
  res.send('generate matrix');
};

export const uploadFormultiplication = (req: Request, res: Response) => {
  // console.log(req.file);
  File.write(
    path.join(__dirname, '..', 'uploads', req.file.originalname),
    req.file.buffer
  );
};

export const getMultiplicationResult = (req: Request, res: Response) => {
  res.send('multiplication result!!!');
};
