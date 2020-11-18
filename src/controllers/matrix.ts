import { Request, Response } from 'express';
import path from 'path';
import { File } from '../models/File';
import { MatrixReader } from '../readers/MatrixReader';

export const generateRandomMatrix = (req: Request, res: Response) => {
  const limitNumber = +process.env.MATRIX_LIMIT_NUMBER!;
  console.log(limitNumber, typeof limitNumber);
  const { rows, columns } = req.body;
};

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
  } catch (error) {
    throw new Error(`upload failed: ${error.message}`);
  }
};

export const getMultiplicationResult = async (req: Request, res: Response) => {
  try {
    const matrixReader1 = MatrixReader.fromCsv(
      path.join(__dirname, '..', 'uploads', 'matrix1.txt')
    );
    const matrixReader2 = MatrixReader.fromCsv(
      path.join(__dirname, '..', 'uploads', 'matrix2.txt')
    );
    await matrixReader1.load();
    await matrixReader2.load();
    console.log('matrix1', matrixReader1.matrix);
    console.log('matrxi 2', matrixReader2.matrix);
    for (let i = 0; i < matrixReader1.matrix.length; i++) {
      for (let j = 0; j < matrixReader2.matrix.length; j++) {}
    }
  } catch (error) {
    throw new Error(`Cannot calcaulte marices: ${error.message}`);
  }
};
