import { Request, Response } from 'express';
import path from 'path';
import { File } from '../models/File';
import { MatrixReader } from '../readers/MatrixReader';

export const generateRandomMatrix = (req: Request, res: Response) => {
  const { rows, columns } = req.body;
  for (let i = 0; i < rows; i++) {}
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
    const { matrix: matrix1 } = matrixReader1;
    const { matrix: matrix2 } = matrixReader2;
    const aNumRows = matrix1.length,
      aNumCols = matrix1[0].length,
      bNumRows = matrix2.length,
      bNumCols = matrix2[0].length,
      m = new Array(aNumRows);
    for (var r = 0; r < aNumRows; ++r) {
      m[r] = new Array(bNumCols);
      for (var c = 0; c < bNumCols; ++c) {
        m[r][c] = 0;
        for (var i = 0; i < aNumCols; ++i) {
          m[r][c] += matrix1[r][i] * matrix2[i][c];
        }
      }
    }
    res.send(m);
  } catch (error) {
    throw new Error(`Cannot calcaulte marices: ${error.message}`);
  }
};
