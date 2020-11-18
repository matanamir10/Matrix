import express from 'express';
import multer from 'multer';
import {
  generateRandomMatrix,
  getMultiplicationResult,
  uploadFormultiplication,
} from '../controllers/matrix';

const router = express.Router();

// TODO add express validator for checking...
router.post('/generate', generateRandomMatrix);
router.post('/upload', multer().array('files'), uploadFormultiplication);
router.get('/multiplication', getMultiplicationResult);

export { router as matrixRouter };
