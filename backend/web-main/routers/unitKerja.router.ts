import { Router, Request, Response, NextFunction } from 'express';
import { Middleware } from '../../helpers/utility/middleware';
import { UnitKerjaController } from '../controllers/unitKerja.controller';

const router = Router();
const unitKerja = new UnitKerjaController();

// function middleware(req: Request, res: Response, next: NextFunction) {
//   Middleware.AuthMiddleware(req, res, next);
// }

//region Find methods
router.get(
  '/',
  // (req, res, next) => middleware(req, res, next),
  (req, res) => unitKerja.findAllUnitKerja(req, res),
);
router.get(
  '/:pkid',
  // (req, res, next) => middleware(req, res, next),
  (req, res) => unitKerja.findUnitKerjaByID(req, res),
);
router.get(
  '/search',
  // (req, res, next) => middleware(req, res, next),
  (req, res) => unitKerja.findUnitKerjaByCriteria(req, res),
);
//endregion

export default router;
