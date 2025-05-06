/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { BaseService } from '../common/base.service';

import { Model, WhereOptions } from 'sequelize';
import { formatMessage, getMessage } from '../../helpers/messages/messagesUtil';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { JabatanAttributes } from '../../infrastructure/models/jabatan.model';
import { JabatanRepository } from '../../data-access/repositories/jabatan.repository';
import { JabatanResultDTO } from '../../helpers/dtos/jabatan.dto';
import {
  JabatanInputVM,
  JabatanResultVM,
} from '../../helpers/view-models/jabatan.vm';

export class JabatanService extends BaseService<Model<JabatanAttributes>> {
  constructor() {
    super(new JabatanRepository());
  }

  //region Helper function to convert model to DTO
  private convertToResultDTO(
    model: Model<JabatanAttributes>,
  ): JabatanResultDTO {
    return model.toJSON();
  }

  //endregion

  //region Find methods

  /**
   * Retrieves all data.
   */
  async findAllJabatan(req: Request): Promise<Model<JabatanAttributes>[]> {
    return await super.findAll(req);
  }

  /**
   * Finds a data by its primary key ID.
   */
  async findJabatanByID(
    req: Request,
    pkid: number,
  ): Promise<Model<JabatanAttributes> | null> {
    return await super.findByPKID(req, pkid);
  }

  async findJabatanByCriteria(
    req: Request,
    criteria: any,
  ): Promise<Model<JabatanAttributes>[]> {
    const where: WhereOptions<JabatanAttributes> = {};
    if (criteria.gaji_pokok) where.gaji_pokok = criteria.gaji_pokok;
    if (criteria.tunjangan) where.tunjangan = criteria.tunjangan;

    return await super.where(req, where);
  }
  //endregion

  //region Create methods

  /**
   * Creates a data.
   * @param req
   * @param vm
   */
  async createJabatan(
    req: Request,
    vm: JabatanInputVM,
  ): Promise<JabatanResultVM> {
    const dto: JabatanAttributes = {
      pkid: 0,
      nama_jabatan: vm.jabatanData.nama_jabatan,
      gaji_pokok: vm.jabatanData.gaji_pokok,
      tunjangan: vm.jabatanData.tunjangan,
    };

    const createdModel = await super.create(req, dto);

    if (!(createdModel instanceof Model)) {
      const message = getMessage(req, MessagesKey.ERRORCREATION);
      const formattedMessage = formatMessage(message, ['Jabatan']);
      throw new Error(formattedMessage);
    }

    const resultDTO = this.convertToResultDTO(createdModel);
    return new JabatanResultVM(resultDTO);
  }

  async updateJabatan(
    req: Request,
    pkid: number,
    entity: Partial<JabatanAttributes>,
  ): Promise<[number, Model<JabatanAttributes>[]]> {
    return await super.update(req, pkid, entity);
  }
  //endregion
}
