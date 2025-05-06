'use strict';

const baseSeeder = require('../interfaces/baseSeeder');

module.exports = {
  async up(queryInterface) {
    const unit_kerja = [
      { nama_unit: 'Keuangan' },
      { nama_unit: 'Sumber Daya Manusia' },
      { nama_unit: 'Teknologi Informasi' },
      { nama_unit: 'Operasional' },
      { nama_unit: 'Pemasaran' },
      { nama_unit: 'Logistik' },
      { nama_unit: 'Hukum' },
      { nama_unit: 'Pengembangan Bisnis' },
      { nama_unit: 'Pelayanan Pelanggan' },
      { nama_unit: 'Manajemen Risiko' },
    ];

    const unitKerjaRecords = unit_kerja.map((item) =>
      baseSeeder.createRecord(item),
    );

    await queryInterface.bulkInsert('unit_kerja', unitKerjaRecords, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('unit_kerja', null, {});
  },
};
