'use strict';

const baseSeeder = require('../interfaces/baseSeeder');

module.exports = {
  async up(queryInterface) {
    const users = [
      {
        name: 'Admin',
        email: 'admin@revanantyo.com',
        username: 'admin',
        password: 'admin',
        role_pkid: 1,
      },
      {
        name: 'Pegawai 1',
        email: 'pegawai@revanantyo.com',
        username: 'pegawai',
        password: 'pegawai',
        role_pkid: 2,
      },
    ];

    const userRecords = users.map((user) => baseSeeder.createRecord(user));

    await queryInterface.bulkInsert('users', userRecords, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
