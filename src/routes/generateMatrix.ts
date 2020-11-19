import express from 'express';

import { generateRandomMatrix } from '../controllers/generateMatrix';

const router = express.Router();

// TODO add express validator for checking...
router.get(
  '/api/matrix/generate',
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

export { router as generateMatrixRouter };
