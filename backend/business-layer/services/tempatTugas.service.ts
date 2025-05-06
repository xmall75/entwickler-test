/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { BaseService } from '../common/base.service';

import { Model, WhereOptions } from 'sequelize';
import { formatMessage, getMessage } from '../../helpers/messages/messagesUtil';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { TempatTugasAttributes } from '../../infrastructure/models/tempatTugas.model';
import { TempatTugasRepository } from '../../data-access/repositories/tempatTugas.repository';
import { TempatTugasResultDTO } from '../../helpers/dtos/tempatTugas.dto';
import {
  TempatTugasInputVM,
  TempatTugasResultVM,
} from '../../helpers/view-models/tempatTUgas.vm';

export class TempatTugasService extends BaseService<
  Model<TempatTugasAttributes>
> {
  constructor() {
    super(new TempatTugasRepository());
  }

  //region Helper function to convert model to DTO
  private convertToResultDTO(
    model: Model<TempatTugasAttributes>,
  ): TempatTugasResultDTO {
    return model.toJSON();
  }

  //endregion

  //region Find methods

  /**
   * Retrieves all data.
   */
  async findAllTempatTugas(
    req: Request,
  ): Promise<Model<TempatTugasAttributes>[]> {
    return await super.findAll(req);
  }

  /**
   * Finds a data by its primary key ID.
   */
  async findTempatTugasByID(
    req: Request,
    pkid: number,
  ): Promise<Model<TempatTugasAttributes> | null> {
    return await super.findByPKID(req, pkid);
  }

  async findTempatTugasByCriteria(
    req: Request,
    criteria: any,
  ): Promise<Model<TempatTugasAttributes>[]> {
    const where: WhereOptions<TempatTugasAttributes> = {};
    if (criteria.kota) where.kota = criteria.kota;
    if (criteria.provinsi) where.provinsi = criteria.provinsi;

    return await super.where(req, where);
  }
  //endregion

  //region Create methods

  /**
   * Creates a data.
   * @param req
   * @param vm
   */
  async createTempatTugas(
    req: Request,
    vm: TempatTugasInputVM,
  ): Promise<TempatTugasResultVM> {
    const dto: TempatTugasAttributes = {
      pkid: 0,
      provinsi: vm.tempatTugasData.provinsi,
      kota: vm.tempatTugasData.kota,
    };

    const createdModel = await super.create(req, dto);

    if (!(createdModel instanceof Model)) {
      const message = getMessage(req, MessagesKey.ERRORCREATION);
      const formattedMessage = formatMessage(message, ['TempatTugas']);
      throw new Error(formattedMessage);
    }

    const resultDTO = this.convertToResultDTO(createdModel);
    return new TempatTugasResultVM(resultDTO);
  }

  async updateTempatTugas(
    req: Request,
    pkid: number,
    entity: Partial<TempatTugasAttributes>,
  ): Promise<[number, Model<TempatTugasAttributes>[]]> {
    return await super.update(req, pkid, entity);
  }
  //endregion
}
