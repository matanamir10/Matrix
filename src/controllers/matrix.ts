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
    await Promise.all([matrixReader1.load(), matrixReader2.load()]);
    // console.log('matrix1', matrixReader1.matrix);
    // console.log('matrxi 2', matrixReader2.matrix);
    const { matrix: matrix1 } = matrixReader1;
    const { matrix: matrix2 } = matrixReader2;
    const results = [],
      ITERATION_NUMBER = matrix1.length * 2;
    let sum = 0,
      k = 0;
    for (let i = 0; i < ITERATION_NUMBER; i++) {
      for (let j = 0; j < matrix2.length; j++) {
        let index = i;
        if (i >= matrix1.length) {
          index = i - matrix1.length;
        }
        sum += matrix1[index][j] * matrix2[j][k];
      }
      if (i + 1 === matrix1.length) {
        // * if this is equal we need to start new iteration
        k++;
      }
      results.push(sum);
      sum = 0;
    }
    console.log('result', results);
  } catch (error) {
    throw new Error(`Cannot calcaulte marices: ${error.message}`);
  }
};
