/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntity } from '../interfaces/baseEntity.model';

export interface UnitKerjaAttributes {
  pkid: number;
  nama_unit: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class UnitKerja extends BaseEntity implements UnitKerjaAttributes {
    pkid!: number;
    nama_unit!: string;

    static associate(models: any) {
      this.hasOne(models.Pegawai, {
        foreignKey: 'unit_kerja_pkid',
        as: 'pegawai',
      });
    }
  }

  UnitKerja.init(
    {
      pkid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nama_unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UnitKerja',
      tableName: 'unit_kerja',
      timestamps: false,
    },
  );

  return UnitKerja;
};
