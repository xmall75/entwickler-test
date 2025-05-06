import { Router, Request, Response, NextFunction } from 'express';
import { PegawaiController } from '../controllers/pegawai.controller';
import { Middleware } from '../../helpers/utility/middleware';

const router = Router();
const pegawaiController = new PegawaiController();

// function middleware(req: Request, res: Response, next: NextFunction) {
//   Middleware.AuthMiddleware(req, res, next);
// }

//region Find methods
router.get(
  '/',
  // (req, res, next) => middleware(req, res, next),
  (req, res) => pegawaiController.findAllPegawai(req, res),
);
router.get(
  '/:pkid',
  // (req, res, next) => middleware(req, res, next),
  (req, res) => pegawaiController.findPegawaiByID(req, res),
);
router.get(
  '/search',
  // (req, res, next) => middleware(req, res, next),
  (req, res) => pegawaiController.findPegawaiByCriteria(req, res),
);
//endregion

//region Create methods
router.post(
  '/',
  // (req, res, next) => middleware(req, res, next),
  (req, res) => pegawaiController.createPegawai(req, res),
);
//endregion

//region Update methods
router.put(
  '/:pkid',
  // (req, res, next) => middleware(req, res, next),
  (req, res) => pegawaiController.updatePegawai(req, res),
);
//endregion

//region Delete & Restore methods
router.delete(
  '/soft/:pkid',
  // (req, res, next) => middleware(req, res, next),
  (req, res) => pegawaiController.softDeletePegawai(req, res),
);
router.put(
  '/restore/:pkid',
  // (req, res, next) => middleware(req, res, next),
  (req, res) => pegawaiController.restorePegawai(req, res),
);
//endregion

export default router;
