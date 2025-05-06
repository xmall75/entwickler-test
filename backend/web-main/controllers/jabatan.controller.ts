import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { JabatanService } from '../../business-layer/services/jabatan.service';
import { JabatanInputVM } from '../../helpers/view-models/jabatan.vm';

export class JabatanController extends BaseController {
  private jabatanService: JabatanService;

  constructor() {
    super();
    this.jabatanService = new JabatanService();
  }

  //region Find methods

  /**
   * Retrieves all data.
   * @param req
   * @param res
   */
  public async findAllJabatan(req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.jabatanService.findAllJabatan(req);
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
  public async findJabatanByID(req: Request, res: Response): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }

      const data = await this.jabatanService.findJabatanByID(req, pkid);
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

  public async findJabatanByCriteria(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const criteria = req.query;
      const data = await this.jabatanService.findJabatanByCriteria(
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
  public async createJabatan(req: Request, res: Response): Promise<Response> {
    try {
      const vm = new JabatanInputVM(req.body);

      const resultVM = await this.jabatanService.createJabatan(req, vm);
      return this.sendSuccessCreate(req, res, resultVM.result);
      // return this.sendSuccessCreate(req, res, resultVM.result, resultVM.result.pkid);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async updateJabatan(req: Request, res: Response): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }

      const updateResult = await this.jabatanService.updateJabatan(
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
  public async softDeleteJabatan(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }
      await this.jabatanService.softDelete(req, pkid);

      return this.sendSuccessSoftDelete(req, res);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async hardDeleteJabatan(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }

      await this.jabatanService.hardDelete(req, pkid);

      return this.sendSuccessHardDelete(req, res);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async restoreJabatan(req: Request, res: Response): Promise<Response> {
    try {
      const pkid = parseInt(req.params.pkid);
      if (isNaN(pkid)) {
        return this.sendErrorBadRequest(req, res);
      }
      await this.jabatanService.restore(req, pkid);

      return this.sendSuccessRestore(req, res, pkid);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }
  //endregion
}
