'use strict';

const baseSeeder = require('../interfaces/baseSeeder');

module.exports = {
  async up(queryInterface) {
    const jabatan = [
      {
        nama_jabatan: 'Kepala Biro Perencanaan, Kepegawaian dan Hukum',
        gaji_pokok: 20000000,
        tunjangan: 5000000,
      },
      {
        nama_jabatan: 'Surveyor Pemetaan Pertama',
        gaji_pokok: 12000000,
        tunjangan: 3000000,
      },
      {
        nama_jabatan: 'Intern',
        gaji_pokok: 3000000,
        tunjangan: 1000000,
      },
      {
        nama_jabatan: 'Kepala Sekretariat Utama',
        gaji_pokok: 25000000,
        tunjangan: 7000000,
      },
      {
        nama_jabatan: 'Penyusun Laporan Keuangan',
        gaji_pokok: 10000000,
        tunjangan: 2000000,
      },
      {
        nama_jabatan: 'Analis Data Survei dan Pemetaan',
        gaji_pokok: 15000000,
        tunjangan: 4000000,
      },
      {
        nama_jabatan: 'Perancang Per-UUan Utama IV/e',
        gaji_pokok: 18000000,
        tunjangan: 5000000,
      },
      {
        nama_jabatan: 'Widyaiswara Utama IV/e',
        gaji_pokok: 18000000,
        tunjangan: 5000000,
      },
      {
        nama_jabatan: 'Analis Kepegawaian Madya IV/b',
        gaji_pokok: 16000000,
        tunjangan: 4500000,
      },
      {
        nama_jabatan: 'Kepala Sub Bidang Kerjasama dan Pelayanan Riset, DKP',
        gaji_pokok: 14000000,
        tunjangan: 3500000,
      },
      {
        nama_jabatan: 'Analis Hukum',
        gaji_pokok: 13000000,
        tunjangan: 3000000,
      },
      {
        nama_jabatan: 'Peneliti Pertama III/b',
        gaji_pokok: 12000000,
        tunjangan: 2500000,
      },
      {
        nama_jabatan: 'Surveyor Pemetaan Muda',
        gaji_pokok: 11000000,
        tunjangan: 2000000,
      },
      {
        nama_jabatan: 'Kepala Subbag Kepegawaian',
        gaji_pokok: 14000000,
        tunjangan: 3500000,
      },
    ];

    const jabatanRecords = jabatan.map((item) => baseSeeder.createRecord(item));

    await queryInterface.bulkInsert('jabatan', jabatanRecords, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('jabatan', null, {});
  },
};
