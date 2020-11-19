import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { NotFoundError } from './errors/notFound';
import { errorHandler } from './middlewares/errorHandler';
import { generateMatrixRouter } from './routes/generateMatrix';
import { uploadMatricesRouter } from './routes/uploadMatrices';
import { multiplyMatricesRouter } from './routes/multiplyMatrices';

const app = express();

app.use(cors());
app.use(express.json());

app.use(generateMatrixRouter);
app.use(uploadMatricesRouter);
app.use(multiplyMatricesRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
