import { PegawaiInputDTO, PegawaiResultDTO } from '../dtos/pegawai.dto';

export class PegawaiInputVM {
  pegawaiData: PegawaiInputDTO;

  constructor(pegawaiData: PegawaiInputDTO) {
    this.pegawaiData = pegawaiData;
  }
}

export class PegawaiResultVM {
  result: PegawaiResultDTO;

  constructor(result: PegawaiResultDTO) {
    this.result = result;
  }
}
