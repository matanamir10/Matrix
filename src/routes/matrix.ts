import express from 'express';
import { generateRandomMatrix } from '../controllers/matrix';

const router = express.Router();

// TODO add express validator for checking...
router.post('/generate', generateRandomMatrix);

export { router as matrixRouter };
