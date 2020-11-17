import express from 'express';
import {
  generateRandomMatrix,
  getMultiplicationResult,
  uploadFormultiplication,
} from '../controllers/matrix';
import { uploadStorgae } from '../fileStrorage';

const router = express.Router();

// TODO add express validator for checking...
router.post('/generate', generateRandomMatrix);
router.post('/upload', uploadStorgae.single('file'), uploadFormultiplication);
router.get('/multiplication', getMultiplicationResult);

export { router as matrixRouter };
