import { Request, Response } from 'express';

export const generateRandomMatrix = (req: Request, res: Response) => {
  res.send('generate matrix');
};

export const multiplication = (req: Request, res: Response) => {
  res.send('multiplication');
};

export const getMultiplicationResult = (req: Request, res: Response) => {
  res.send('multiplication result!!!');
};
