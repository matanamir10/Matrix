import { Request, Response } from 'express';
import path from 'path';
import { MatrixReader } from '../readers/MatrixReader';

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
    if (!matrix1 || !matrix2 || matrix1[0].length !== matrix2.length) {
      throw new Error('matrix must be: m x n --- n x p');
    }
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
