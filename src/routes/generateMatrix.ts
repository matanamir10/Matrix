import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validationError';
import { generateRandomMatrix } from '../controllers/generateMatrix';

const router = express.Router();

router.get(
  '/api/matrix/generate',
  [
    body('rows')
      .isFloat({ min: 1 })
      .withMessage('Rows number must be positive for matrix'),
    body('columns')
      .isFloat({ min: 1 })
      .withMessage('Col number must be positive for matrix'),
    validateRequest,
  ],
  generateRandomMatrix
);

export { router as generateMatrixRouter };
