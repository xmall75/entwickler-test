import { JabatanProperty } from './jabatan';
import { TempatTugasProperty } from './tempat_tugas';
import { UnitKerjaProperty } from './unit_kerja';

export interface PegawaiInputProperty {
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

export interface PegawaiDetailProperty extends PegawaiInputProperty {
  pkid: number;
  jabatan: JabatanProperty;
  unit_kerja: UnitKerjaProperty;
  tempat_tugas: TempatTugasProperty;
}

export const pegawaiInitialValues: PegawaiInputProperty = {
  nip: '',
  foto: null,
  nama_lengkap: '',
  tempat_lahir: '',
  tanggal_lahir: new Date(),
  alamat: '',
  golongan: '',
  eselon: '',
  no_hp: '',
  npwp: '',
  jenis_kelamin: '',
  agama: '',
  jabatan_pkid: 0,
  unit_kerja_pkid: 0,
  tempat_tugas_pkid: 0,
};
