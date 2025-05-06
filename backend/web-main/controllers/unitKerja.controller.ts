import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { UnitKerjaService } from '../../business-layer/services/unitKerja.service';
import { UnitKerjaInputVM } from '../../helpers/view-models/unitKerja.vm';

export class UnitKerjaController extends BaseController {
  private unitKerjaService: UnitKerjaService;

  constructor() {
    super();
    this.unitKerjaService = new UnitKerjaService();
  }

  //region Find methods

  /**
   * Retrieves all data.
   * @param req
   * @param res
   */
  public async findAllUnitKerja(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const data = await this.unitKerjaService.findAllUnitKerja(req);
      if (data && data.length > 0) {
        return this.sendSuccessGet(req, res, data, MessagesKey.SUCCESSGET, 200);
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
  public async findUnitKerjaByID(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }

      const data = await this.unitKerjaService.findUnitKerjaByID(req, pkid);
      if (data) {
        return this.sendSuccessGet(
          req,
          res,
          data,
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

  public async findUnitKerjaByCriteria(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const criteria = req.query;
      const data = await this.unitKerjaService.findUnitKerjaByCriteria(
        req,
        criteria,
      );
      if (data.length > 0) {
        return this.sendSuccessGet(req, res, data, MessagesKey.SUCCESSGET, 200);
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
  public async createUnitKerja(req: Request, res: Response): Promise<Response> {
    try {
      const vm = new UnitKerjaInputVM(req.body);

      const resultVM = await this.unitKerjaService.createUnitKerja(req, vm);
      return this.sendSuccessCreate(req, res, resultVM.result);
      // return this.sendSuccessCreate(req, res, resultVM.result, resultVM.result.pkid);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async updateUnitKerja(req: Request, res: Response): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }

      const updateResult = await this.unitKerjaService.updateUnitKerja(
        req,
        pkid,
        req.body,
      );

      return this.sendSuccessUpdate(req, res, updateResult);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }
  //endregion

  //region Delete and Restore methods
  public async softDeleteUnitKerja(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }
      await this.unitKerjaService.softDelete(req, pkid);

      return this.sendSuccessSoftDelete(req, res);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async hardDeleteUnitKerja(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }

      await this.unitKerjaService.hardDelete(req, pkid);

      return this.sendSuccessHardDelete(req, res);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async restoreUnitKerja(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }
      await this.unitKerjaService.restore(req, pkid);

      return this.sendSuccessRestore(req, res, pkid);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }
  //endregion
}
