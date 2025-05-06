/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { BaseService } from '../common/base.service';

import { Model, WhereOptions } from 'sequelize';
import { formatMessage, getMessage } from '../../helpers/messages/messagesUtil';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { PegawaiAttributes } from '../../infrastructure/models/pegawai.model';
import { PegawaiRepository } from '../../data-access/repositories/pegawai.repository';
import { PegawaiResultDTO } from '../../helpers/dtos/pegawai.dto';
import {
  PegawaiInputVM,
  PegawaiResultVM,
} from '../../helpers/view-models/pegawai.vm';

export class PegawaiService extends BaseService<Model<PegawaiAttributes>> {
  constructor() {
    super(new PegawaiRepository());
  }

  //region Helper function to convert model to DTO
  private convertToResultDTO(
    model: Model<PegawaiAttributes>,
  ): PegawaiResultDTO {
    return model.toJSON();
  }

  //endregion

  //region Find methods

  /**
   * Retrieves all data.
   */
  async findAllPegawai(req: Request): Promise<Model<PegawaiAttributes>[]> {
    return await super.findAll(req);
  }

  /**
   * Finds a data by its primary key ID.
   */
  async findPegawaiByID(
    req: Request,
    pkid: number,
  ): Promise<Model<PegawaiAttributes> | null> {
    return await super.findByPKID(req, pkid);
  }

  async findPegawaiByCriteria(
    req: Request,
    criteria: any,
  ): Promise<Model<PegawaiAttributes>[]> {
    const where: WhereOptions<PegawaiAttributes> = {};
    if (criteria.nama_lengkap) where.nama_lengkap = criteria.nama_lengkap;
    if (criteria.nip) where.nip = criteria.nip;
    if (criteria.npwp) where.npwp = criteria.npwp;

    return await super.where(req, where);
  }
  //endregion

  //region Create methods

  /**
   * Creates a data.
   * @param req
   * @param vm
   */
  async createPegawai(
    req: Request,
    vm: PegawaiInputVM,
  ): Promise<PegawaiResultVM> {
    const dto: PegawaiAttributes = {
      pkid: 0,
      nip: vm.pegawaiData.nip,
      foto: vm.pegawaiData.foto,
      nama_lengkap: vm.pegawaiData.nama_lengkap,
      tempat_lahir: vm.pegawaiData.tempat_lahir,
      tanggal_lahir: vm.pegawaiData.tanggal_lahir,
      alamat: vm.pegawaiData.alamat,
      golongan: vm.pegawaiData.golongan,
      eselon: vm.pegawaiData.eselon,
      no_hp: vm.pegawaiData.no_hp,
      npwp: vm.pegawaiData.npwp,
      jenis_kelamin: vm.pegawaiData.jenis_kelamin,
      agama: vm.pegawaiData.agama,
      jabatan_pkid: vm.pegawaiData.jabatan_pkid,
      unit_kerja_pkid: vm.pegawaiData.unit_kerja_pkid,
      tempat_tugas_pkid: vm.pegawaiData.tempat_tugas_pkid,
    };

    const createdModel = await super.create(req, dto);

    if (!(createdModel instanceof Model)) {
      const message = getMessage(req, MessagesKey.ERRORCREATION);
      const formattedMessage = formatMessage(message, ['Pegawai']);
      throw new Error(formattedMessage);
    }

    const resultDTO = this.convertToResultDTO(createdModel);
    return new PegawaiResultVM(resultDTO);
  }

  async updatePegawai(
    req: Request,
    pkid: number,
    entity: Partial<PegawaiAttributes>,
  ): Promise<[number, Model<PegawaiAttributes>[]]> {
    return await super.update(req, pkid, entity);
  }
  //endregion
}
