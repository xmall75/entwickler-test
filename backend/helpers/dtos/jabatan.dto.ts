import { JabatanAttributes } from '../../infrastructure/models/jabatan.model';

export interface JabatanInputDTO {
  nama_jabatan: string;
  gaji_pokok: number;
  tunjangan: number;
}

export interface JabatanResultDTO extends JabatanAttributes {}
