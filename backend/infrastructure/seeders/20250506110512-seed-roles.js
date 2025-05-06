'use strict';

const baseSeeder = require('../interfaces/baseSeeder');

module.exports = {
  async up(queryInterface) {
    const roles = [
      { role: 'admin', pegawai_permission: 'rwd' },
      { role: 'pegawai', pegawai_permission: 'r' },
    ];

    const rolesRecords = roles.map((item) =>
      baseSeeder.createRecord(item),
    );

    await queryInterface.bulkInsert('roles', rolesRecords, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
