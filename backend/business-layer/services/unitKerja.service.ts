/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { BaseService } from '../common/base.service';

import { Model, WhereOptions } from 'sequelize';
import { formatMessage, getMessage } from '../../helpers/messages/messagesUtil';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { UnitKerjaAttributes } from '../../infrastructure/models/unitKerja.model';
import { UnitKerjaRepository } from '../../data-access/repositories/unitKerja.repository';
import { UnitKerjaResultDTO } from '../../helpers/dtos/unitKerja.dto';
import {
  UnitKerjaInputVM,
  UnitKerjaResultVM,
} from '../../helpers/view-models/unitKerja.vm';

export class UnitKerjaService extends BaseService<Model<UnitKerjaAttributes>> {
  constructor() {
    super(new UnitKerjaRepository());
  }

  //region Helper function to convert model to DTO
  private convertToResultDTO(
    model: Model<UnitKerjaAttributes>,
  ): UnitKerjaResultDTO {
    return model.toJSON();
  }

  //endregion

  //region Find methods

  /**
   * Retrieves all data.
   */
  async findAllUnitKerja(req: Request): Promise<Model<UnitKerjaAttributes>[]> {
    return await super.findAll(req);
  }

  /**
   * Finds a data by its primary key ID.
   */
  async findUnitKerjaByID(
    req: Request,
    pkid: number,
  ): Promise<Model<UnitKerjaAttributes> | null> {
    return await super.findByPKID(req, pkid);
  }

  async findUnitKerjaByCriteria(
    req: Request,
    criteria: any,
  ): Promise<Model<UnitKerjaAttributes>[]> {
    const where: WhereOptions<UnitKerjaAttributes> = {};
    if (criteria.nama_unit) where.nama_unit = criteria.nama_unit;

    return await super.where(req, where);
  }
  //endregion

  //region Create methods

  /**
   * Creates a data.
   * @param req
   * @param vm
   */
  async createUnitKerja(
    req: Request,
    vm: UnitKerjaInputVM,
  ): Promise<UnitKerjaResultVM> {
    const dto: UnitKerjaAttributes = {
      pkid: 0,
      nama_unit: vm.unitKerjaData.nama_unit,
    };

    const createdModel = await super.create(req, dto);

    if (!(createdModel instanceof Model)) {
      const message = getMessage(req, MessagesKey.ERRORCREATION);
      const formattedMessage = formatMessage(message, ['UnitKerja']);
      throw new Error(formattedMessage);
    }

    const resultDTO = this.convertToResultDTO(createdModel);
    return new UnitKerjaResultVM(resultDTO);
  }

  async updateUnitKerja(
    req: Request,
    pkid: number,
    entity: Partial<UnitKerjaAttributes>,
  ): Promise<[number, Model<UnitKerjaAttributes>[]]> {
    return await super.update(req, pkid, entity);
  }
  //endregion
}
