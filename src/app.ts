import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { matrixRouter } from './routes/matrix';
import { NotFoundError } from './errors/notFound';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use(matrixRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
