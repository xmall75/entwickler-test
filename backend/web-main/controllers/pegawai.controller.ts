import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { PegawaiService } from '../../business-layer/services/pegawai.service';
import { PegawaiInputVM } from '../../helpers/view-models/pegawai.vm';

export class PegawaiController extends BaseController {
  private pegawaiService: PegawaiService;

  constructor() {
    super();
    this.pegawaiService = new PegawaiService();
  }

  //region Find methods

  /**
   * Retrieves all data.
   * @param req
   * @param res
   */
  public async findAllPegawai(req: Request, res: Response): Promise<Response> {
    try {
      const pegawai = await this.pegawaiService.findAllPegawai(req);
      if (pegawai && pegawai.length > 0) {
        return this.sendSuccessGet(
          req,
          res,
          pegawai,
          MessagesKey.SUCCESSGET,
          200,
        );
      } else {
        return this.sendErrorNotFound(req, res);
      }
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  /**
   * Finds a data by its primary key ID.
   * @param req
   * @param res
   */
  public async findPegawaiByID(req: Request, res: Response): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }

      const pegawai = await this.pegawaiService.findPegawaiByID(req, pkid);
      if (pegawai) {
        return this.sendSuccessGet(
          req,
          res,
          pegawai,
          MessagesKey.SUCCESSGETBYID,
          200,
        );
      } else {
        return this.sendErrorNotFound(req, res);
      }
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async findPegawaiByCriteria(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const criteria = req.query;
      const items = await this.pegawaiService.findPegawaiByCriteria(
        req,
        criteria,
      );
      if (items.length > 0) {
        return this.sendSuccessGet(
          req,
          res,
          items,
          MessagesKey.SUCCESSGET,
          200,
        );
      } else {
        return this.sendErrorNoDataFoundSuccess(req, res);
      }
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  //endregion

  //region Create methods

  /**
   * Creates a data.
   * @param req
   * @param res
   */
  public async createPegawai(req: Request, res: Response): Promise<Response> {
    try {
      const vm = new PegawaiInputVM(req.body);

      const resultVM = await this.pegawaiService.createPegawai(req, vm);
      return this.sendSuccessCreate(req, res, resultVM.result);
      // return this.sendSuccessCreate(req, res, resultVM.result, resultVM.result.pkid);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async updatePegawai(req: Request, res: Response): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }

      const updateResult = await this.pegawaiService.updatePegawai(
        req,
        pkid,
        req.body,
      );

      console.log(req);
      return this.sendSuccessUpdate(req, res, updateResult);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }
  //endregion

  //region Delete and Restore methods
  public async softDeletePegawai(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }
      await this.pegawaiService.softDelete(req, pkid);

      return this.sendSuccessHardDelete(req, res);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async restorePegawai(req: Request, res: Response): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }
      await this.pegawaiService.restore(req, pkid);

      return this.sendSuccessRestore(req, res, pkid);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }
  //endregion
}
