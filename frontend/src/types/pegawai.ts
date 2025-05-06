import { JabatanProperty } from "./jabatan";
import { TempatTugasProperty } from "./tempat_tugas";
import { UnitKerjaProperty } from "./unit_kerja";

export interface PegawaiProperty {
  pkid: number;
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

export interface PegawaiDetailProperty extends PegawaiProperty {
  jabatan: JabatanProperty;
  unit_kerja: UnitKerjaProperty;
  tempat_tugas: TempatTugasProperty;
}
