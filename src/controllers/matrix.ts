import { Request, Response } from 'express';
import path from 'path';
import { File } from '../models/File';
import { CsvFileReader } from '../readers/CsvFileReader';
import { MatrixReader } from '../readers/MatrixReader';

export const generateRandomMatrix = (req: Request, res: Response) => {
  res.send('generate matrix');
};

export const uploadFormultiplication = async (req: Request, res: Response) => {
  // console.log(req.file);
  await File.write(
    path.join(__dirname, '..', 'uploads', req.file.originalname),
    req.file.buffer
  );
};

export const getMultiplicationResult = (req: Request, res: Response) => {
  const matrixReader = MatrixReader.fromCsv(
    path.join(__dirname, '..', 'uploads', 'matrix.txt')
  );
  matrixReader.load();
};
