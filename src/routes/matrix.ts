import express from 'express';
import multer from 'multer';
import { check, body } from 'express-validator';
import {
  generateRandomMatrix,
  getMultiplicationResult,
  uploadFormultiplication,
} from '../controllers/matrix';
import { validateRequest } from '../middlewares/validationError';

const router = express.Router();

// TODO add express validator for checking...
router.get(
  '/generate',
  //   [
  //     body('rows')
  //       .isFloat({ min: 1 })
  //       .withMessage('Rows number must be positive for matrix'),
  //     body('columns')
  //       .isFloat({ min: 1 })
  //       .withMessage('Col number must be positive for matrix'),
  //     validateRequest,
  //   ],
  generateRandomMatrix
);

router.post(
  '/upload',
  multer().array('files'),
  [
    check('files').isEmpty().withMessage('You must provide two matrices...'),
    validateRequest,
  ],
  uploadFormultiplication
);

router.post('/multiplication', getMultiplicationResult);

export { router as matrixRouter };
