import { UnitKerjaAttributes } from '../../infrastructure/models/unitKerja.model';

export interface UnitKerjaInputDTO {
  nama_unit: string;
}

export interface UnitKerjaResultDTO extends UnitKerjaAttributes {}
