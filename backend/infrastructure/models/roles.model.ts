/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntity } from '../interfaces/baseEntity.model';

export interface RolesAttributes {
  pkid: number;
  role: string;
  pegawai_permission: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Roles extends BaseEntity implements RolesAttributes {
    pkid!: number;
    role!: string;
    pegawai_permission!: string;

    static associate(models: any) {
      this.hasMany(models.Users, {
        foreignKey: 'role_pkid',
        as: 'users',
      });
    }
  }

  Roles.init(
    {
      pkid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pegawai_permission: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Roles',
      tableName: 'roles',
      timestamps: false,
    },
  );

  return Roles;
};
