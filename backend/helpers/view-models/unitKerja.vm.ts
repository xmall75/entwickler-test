import { UnitKerjaInputDTO, UnitKerjaResultDTO } from '../dtos/unitKerja.dto';

export class UnitKerjaInputVM {
  unitKerjaData: UnitKerjaInputDTO;

  constructor(unitKerjaData: UnitKerjaInputDTO) {
    this.unitKerjaData = unitKerjaData;
  }
}

export class UnitKerjaResultVM {
  result: UnitKerjaResultDTO;

  constructor(result: UnitKerjaResultDTO) {
    this.result = result;
  }
}
