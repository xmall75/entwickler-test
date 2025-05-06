import { PegawaiAttributes } from '../../infrastructure/models/pegawai.model';

export interface PegawaiInputDTO {
  nip: string;
  foto: string | null;
  nama_lengkap: string;
  tempat_lahir: string;
  tanggal_lahir: Date;
  alamat: string;
  golongan: string;
  eselon: string;
  no_hp: string;
  npwp: string;
  jenis_kelamin: string;
  agama: string;
  jabatan_pkid: number;
  unit_kerja_pkid: number;
  tempat_tugas_pkid: number;
}

export interface PegawaiResultDTO extends PegawaiAttributes {}
