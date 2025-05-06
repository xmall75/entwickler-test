import { Router, Request, Response, NextFunction } from 'express';
import { Middleware } from '../../helpers/utility/middleware';
import { TempatTugasController } from '../controllers/tempatTugas.controller';

const router = Router();
const tempatTugasController = new TempatTugasController();

// function middleware(req: Request, res: Response, next: NextFunction) {
//   Middleware.AuthMiddleware(req, res, next);
// }

//region Find methods
router.get(
  '/',
  // (req, res, next) => middleware(req, res, next),
  (req, res) => tempatTugasController.findAllTempatTugas(req, res),
);
router.get(
  '/:pkid',
  // (req, res, next) => middleware(req, res, next),
  (req, res) => tempatTugasController.findTempatTugasByID(req, res),
);
router.get(
  '/search',
  // (req, res, next) => middleware(req, res, next),
  (req, res) => tempatTugasController.findTempatTugasByCriteria(req, res),
);
//endregion

export default router;
