import express from 'express';
import {
  generateRandomMatrix,
  getMultiplicationResult,
  multiplication,
} from '../controllers/matrix';

const router = express.Router();

// TODO add express validator for checking...
router.post('/generate', generateRandomMatrix);
router.post('/multiplication', multiplication);
router.get('/multiplication', getMultiplicationResult);

export { router as matrixRouter };
