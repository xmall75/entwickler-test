/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntity } from '../interfaces/baseEntity.model';

export interface JabatanAttributes {
  pkid: number;
  nama_jabatan: string;
  gaji_pokok: number;
  tunjangan: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Jabatan extends BaseEntity implements JabatanAttributes {
    pkid!: number;
    nama_jabatan!: string;
    gaji_pokok!: number;
    tunjangan!: number;

    static associate(models: any) {
      this.hasOne(models.Pegawai, {
        foreignKey: 'jabatan_pkid',
        as: 'pegawai',
      });
    }
  }

  Jabatan.init(
    {
      pkid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nama_jabatan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gaji_pokok: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tunjangan: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Jabatan',
      tableName: 'jabatan',
      timestamps: false,
    },
  );

  return Jabatan;
};
