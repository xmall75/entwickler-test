import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { TempatTugasService } from '../../business-layer/services/tempatTugas.service';
import { TempatTugasInputVM } from '../../helpers/view-models/tempatTUgas.vm';

export class TempatTugasController extends BaseController {
  private tempatTugasService: TempatTugasService;

  constructor() {
    super();
    this.tempatTugasService = new TempatTugasService();
  }

  //region Find methods

  /**
   * Retrieves all data.
   * @param req
   * @param res
   */
  public async findAllTempatTugas(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const data = await this.tempatTugasService.findAllTempatTugas(req);
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
  public async findTempatTugasByID(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }

      const data = await this.tempatTugasService.findTempatTugasByID(req, pkid);
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

  public async findTempatTugasByCriteria(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const criteria = req.query;
      const data = await this.tempatTugasService.findTempatTugasByCriteria(
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
  public async createTempatTugas(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const vm = new TempatTugasInputVM(req.body);

      const resultVM = await this.tempatTugasService.createTempatTugas(req, vm);
      return this.sendSuccessCreate(req, res, resultVM.result);
      // return this.sendSuccessCreate(req, res, resultVM.result, resultVM.result.pkid);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async updateTempatTugas(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }

      const updateResult = await this.tempatTugasService.updateTempatTugas(
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
  public async softDeleteTempatTugas(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }
      await this.tempatTugasService.softDelete(req, pkid);

      return this.sendSuccessSoftDelete(req, res);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async hardDeleteTempatTugas(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }

      await this.tempatTugasService.hardDelete(req, pkid);

      return this.sendSuccessHardDelete(req, res);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async restoreTempatTugas(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }
      await this.tempatTugasService.restore(req, pkid);

      return this.sendSuccessRestore(req, res, pkid);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }
  //endregion
}
