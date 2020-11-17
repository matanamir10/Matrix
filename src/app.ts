import express from 'express';
import cors from 'cors';
import { matrixRouter } from './routes/matrix';

const app = express();

app.use(cors());

app.use('/matrix', matrixRouter);

export { app };
