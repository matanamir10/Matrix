import { Request, Response } from 'express';
import { File } from '../models/File';
import path from 'path';

export const uploadFormultiplication = async (req: Request, res: Response) => {
  try {
    const [matrixOne, matrixTwo] = req.files;
    await Promise.all([
      await File.write(
        path.join(__dirname, '..', 'uploads', matrixOne.originalname),
        matrixOne.buffer
      ),
      await File.write(
        path.join(__dirname, '..', 'uploads', matrixTwo.originalname),
        matrixTwo.buffer
      ),
    ]);
    res.status(201).send('Matrices was saved');
  } catch (error) {
    throw new Error(`upload failed: ${error.message}`);
  }
};
