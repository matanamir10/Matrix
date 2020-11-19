import express from 'express';
import { getMultiplicationResult } from '../controllers/multiplyMatrices';

const router = express.Router();

router.post('/api/matrix/multiplication', getMultiplicationResult);

export { router as multiplyMatricesRouter };
