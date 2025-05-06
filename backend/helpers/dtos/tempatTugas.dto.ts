import { TempatTugasAttributes } from '../../infrastructure/models/tempatTugas.model';

export interface TempatTugasInputDTO {
  provinsi: string;
  kota: string;
}

export interface TempatTugasResultDTO extends TempatTugasAttributes {}
