'use strict';
let DataTypes;
({ DataTypes } = require('sequelize'));
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('jabatan', {
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
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('jabatan');
  },
};
