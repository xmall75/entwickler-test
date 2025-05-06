import { Router, Request, Response, NextFunction } from 'express';
import { Middleware } from '../../helpers/utility/middleware';
import { JabatanController } from '../controllers/jabatan.controller';

const router = Router();
const jabatanController = new JabatanController();

// function middleware(req: Request, res: Response, next: NextFunction) {
//   Middleware.AuthMiddleware(req, res, next);
// }

//region Find methods
router.get(
  '/',
  // (req, res, next) => middleware(req, res, next),
  (req, res) => jabatanController.findAllJabatan(req, res),
);
router.get(
  '/:pkid',
  // (req, res, next) => middleware(req, res, next),
  (req, res) => jabatanController.findJabatanByID(req, res),
);
router.get(
  '/search',
  // (req, res, next) => middleware(req, res, next),
  (req, res) => jabatanController.findJabatanByCriteria(req, res),
);
//endregion

export default router;
