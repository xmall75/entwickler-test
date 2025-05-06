/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntity } from '../interfaces/baseEntity.model';

export interface PegawaiAttributes {
  pkid: number;
  nip: string;
  nama_lengkap: string;
  tempat_lahir: string;
  tanggal_lahir: Date;
  alamat: string;
  eselon: string;
  no_hp: string;
  npwp: string;
  agama: string;
  jabatan_pkid: number;
  unit_kerja_pkid: number;
  tempat_tugas_pkid: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Pegawai extends BaseEntity implements PegawaiAttributes {
    pkid!: number;
    nip!: string;
    nama_lengkap!: string;
    tempat_lahir!: string;
    tanggal_lahir!: Date;
    alamat!: string;
    eselon!: string;
    no_hp!: string;
    npwp!: string;
    agama!: string;
    jabatan_pkid!: number;
    unit_kerja_pkid!: number;
    tempat_tugas_pkid!: number;

    static associate(models: any) {
      this.belongsTo(models.Jabatan, {
        foreignKey: 'jabatan_pkid',
        as: 'jabatan',
      });

      this.belongsTo(models.UnitKerja, {
        foreignKey: 'unit_kerja_pkid',
        as: 'unit_kerja',
      });

      this.belongsTo(models.TempatTugas, {
        foreignKey: 'tempat_tugas_pkid',
        as: 'tempat_tugas',
      });
    }
  }

  Pegawai.init(
    {
      pkid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nama_lengkap: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tempat_lahir: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tanggal_lahir: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eselon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_hp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      npwp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      agama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jabatan_pkid: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      unit_kerja_pkid: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      tempat_tugas_pkid: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Pegawai',
      tableName: 'pegawai',
      timestamps: false,
    },
  );

  return Pegawai;
};
