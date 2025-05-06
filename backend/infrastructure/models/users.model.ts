/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntity } from '../interfaces/baseEntity.model';

export interface UsersAttributes {
  pkid: number;
  email: string;
  name: string;
  username: string;
  password: string;
  role_pkid: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Users extends BaseEntity implements UsersAttributes {
    pkid!: number;
    email!: string;
    name!: string;
    username!: string;
    password!: string;
    role_pkid!: number;

    static associate(models: any) {
      this.belongsTo(models.Roles, {
        foreignKey: 'role_pkid',
        as: 'roles',
      });
    }
  }

  Users.init(
    {
      pkid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_pkid: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Users',
      tableName: 'users',
      timestamps: false,
    },
  );

  return Users;
};
