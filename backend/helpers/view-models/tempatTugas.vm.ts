import {
  TempatTugasInputDTO,
  TempatTugasResultDTO,
} from '../dtos/tempatTugas.dto';

export class TempatTugasInputVM {
  tempatTugasData: TempatTugasInputDTO;

  constructor(tempatTugasData: TempatTugasInputDTO) {
    this.tempatTugasData = tempatTugasData;
  }
}

export class TempatTugasResultVM {
  result: TempatTugasResultDTO;

  constructor(result: TempatTugasResultDTO) {
    this.result = result;
  }
}
