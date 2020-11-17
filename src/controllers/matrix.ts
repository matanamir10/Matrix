import { Request, Response } from 'express';

export const generateRandomMatrix = (req: Request, res: Response) => {
  res.send('generate matrix');
};

export const uploadFormultiplication = (req: Request, res: Response) => {
  console.log(req.file);
  res.send('uploadFormultiplication');
};

export const getMultiplicationResult = (req: Request, res: Response) => {
  res.send('multiplication result!!!');
};
