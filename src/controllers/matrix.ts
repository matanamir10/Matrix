import { Request, Response } from 'express';
import path from 'path';
import { File } from '../models/File';
import { MatrixReader } from '../readers/MatrixReader';
import fs from 'fs';

export const generateRandomMatrix = async (req: Request, res: Response) => {
  const { rows, columns } = req.body;
  const PREFIX = ',';
  let data = ``;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 20; j++) {
      const rnd = Math.round(Math.random() * 1000);
      if (j + 1 === 20) {
        data = data.concat(`${rnd.toString()}`);
      } else {
        data = data.concat(`${rnd.toString()}${PREFIX}`);
      }
    }
    data = data.concat('\n');
  }
  console.log(Buffer.from(data));
  File.write(
    path.join(__dirname, '..', 'uploads', 'generate.txt'),
    Buffer.from(data)
  ).then(() => {
    //   TODO need to check why with timeout this working...
    console.log('downloading');
    res.download(
      path.join(__dirname, '..', 'uploads', 'generate.txt'),
      (err) => {
        console.log(err);
      }
    );
  });
  //   fs.createReadStream(
  //     path.join(__dirname, '..', 'uploads', 'generate.txt')
  //   ).pipe(res);

  // * Can download as a txt file
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
    res.status(201).send('Matrices was saved');
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
    console.log(matrix1[0].length);
    console.log(matrix2.length);
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
