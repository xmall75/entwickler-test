import { JabatanInputDTO, JabatanResultDTO } from '../dtos/jabatan.dto';

export class JabatanInputVM {
  jabatanData: JabatanInputDTO;

  constructor(jabatanData: JabatanInputDTO) {
    this.jabatanData = jabatanData;
  }
}

export class JabatanResultVM {
  result: JabatanResultDTO;

  constructor(result: JabatanResultDTO) {
    this.result = result;
  }
}
