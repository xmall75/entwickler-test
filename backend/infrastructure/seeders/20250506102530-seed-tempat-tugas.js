'use strict';

const baseSeeder = require('../interfaces/baseSeeder');

module.exports = {
  async up(queryInterface) {
    const tempat_tugas = [
      {
        provinsi: 'DKI Jakarta',
        kota: 'Jakarta',
      },
      {
        provinsi: 'Jawa Barat',
        kota: 'Bandung',
      },
      {
        provinsi: 'Jawa Tengah',
        kota: 'Semarang',
      },
      {
        provinsi: 'Jawa Timur',
        kota: 'Surabaya',
      },
      {
        provinsi: 'Bali',
        kota: 'Denpasar',
      },
      {
        provinsi: 'Sumatera Utara',
        kota: 'Medan',
      },
      {
        provinsi: 'Kalimantan Selatan',
        kota: 'Banjarmasin',
      },
      {
        provinsi: 'Sulawesi Selatan',
        kota: 'Makassar',
      },
      {
        provinsi: 'Aceh',
        kota: 'Banda Aceh',
      },
      {
        provinsi: 'Papua',
        kota: 'Jayapura',
      },
      {
        provinsi: 'Maluku',
        kota: 'Ambon',
      },
      {
        provinsi: 'Nusa Tenggara Barat',
        kota: 'Mataram',
      },
      {
        provinsi: 'Nusa Tenggara Timur',
        kota: 'Kupang',
      },
      {
        provinsi: 'Riau',
        kota: 'Pekanbaru',
      },
      {
        provinsi: 'Lampung',
        kota: 'Bandar Lampung',
      },
      {
        provinsi: 'Kalimantan Barat',
        kota: 'Pontianak',
      },
      {
        provinsi: 'Kalimantan Timur',
        kota: 'Samarinda',
      },
      {
        provinsi: 'Sulawesi Utara',
        kota: 'Manado',
      },
    ];

    const tempatTugasRecords = tempat_tugas.map((item) =>
      baseSeeder.createRecord(item),
    );

    await queryInterface.bulkInsert('tempat_tugas', tempatTugasRecords, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tempat_tugas', null, {});
  },
};
