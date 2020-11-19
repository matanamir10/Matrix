import express from 'express';
import multer from 'multer';
import { check } from 'express-validator';
import { uploadFormultiplication } from '../controllers/uploadMatrices';
import { validateRequest } from '../middlewares/validationError';

const router = express.Router();

router.post(
  '/api/matrix/upload',
  multer().array('files'),
  [
    check('files').isEmpty().withMessage('You must provide two matrices...'),
    validateRequest,
  ],
  uploadFormultiplication
);

export { router as uploadMatricesRouter };
