/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntity } from '../interfaces/baseEntity.model';

export interface TempatTugasAttributes {
  pkid: number;
  provinsi: string;
  kota: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class TempatTugas extends BaseEntity implements TempatTugasAttributes {
    pkid!: number;
    provinsi!: string;
    kota!: string;

    static associate(models: any) {
      this.hasOne(models.Pegawai, {
        foreignKey: 'tempat_tugas_pkid',
        as: 'pegawai',
      });
    }
  }

  TempatTugas.init(
    {
      pkid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      provinsi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kota: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'TempatTugas',
      tableName: 'tempat_tugas',
      timestamps: false,
    },
  );

  return TempatTugas;
};
