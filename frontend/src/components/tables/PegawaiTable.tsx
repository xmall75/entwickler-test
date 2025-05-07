'use client';

import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { PegawaiDetailProperty } from '@/types/pegawai';
import { useGetAllPegawai } from '@/hooks/api/pegawai/useGetAllPegawai';
import { FaEye, FaPencil, FaTrashCan } from 'react-icons/fa6';
import { JabatanProperty } from '@/types/jabatan';
import { useGetAllJabatan } from '@/hooks/api/jabatan/useGetAllJabatan';
import { useGetAllTempatTugas } from '@/hooks/api/tempat_tugas/useGetAllTempatTugas';
import { TempatTugasProperty } from '@/types/tempat_tugas';
import { useGetAllUnitKerja } from '@/hooks/api/unit_kerja/useGetAllUnitKerja';
import { UnitKerjaProperty } from '@/types/unit_kerja';

interface DataType extends PegawaiDetailProperty {
  key: string;
}

const PegawaiTable = () => {
  const { data: pegawaiData } = useGetAllPegawai();
  const { data: jabatanData } = useGetAllJabatan();
  const { data: tempatTugasData } = useGetAllTempatTugas();
  const { data: unitKerjaData } = useGetAllUnitKerja();

  const jabatanFilters =
    jabatanData?.data.map((jabatan: JabatanProperty) => ({
      text: jabatan.nama_jabatan,
      value: jabatan.nama_jabatan,
    })) || [];

  const tempatTugasFilters =
    tempatTugasData?.data.map((tempatTugas: TempatTugasProperty) => ({
      text: tempatTugas.kota,
      value: tempatTugas.kota,
    })) || [];

  const unitKerjaFilters =
    unitKerjaData?.data.map((unitKerja: UnitKerjaProperty) => ({
      text: unitKerja.nama_unit,
      value: unitKerja.nama_unit,
    })) || [];

  const handleView = (pkid: number) => {
    return pkid;
  };

  const handleEdit = (pkid: number) => {
    return pkid;
  };

  const handleDelete = (pkid: number) => {};

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'NIP',
      dataIndex: 'nip',
      key: 'nip',
      fixed: 'left',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Nama Lengkap',
      dataIndex: 'nama_lengkap',
      key: 'nama_lengkap',
      fixed: 'left',
    },
    {
      title: 'Tempat Lahir',
      dataIndex: 'tempat_lahir',
      key: 'tempat_lahir',
    },
    {
      title: 'Alamat',
      dataIndex: 'alamat',
      key: 'alamat',
    },
    {
      title: 'Tanggal Lahir',
      dataIndex: 'tanggal_lahir',
      key: 'tanggal_lahir',
      render: date => <span>{new Date(date).toLocaleDateString('id-ID')}</span>,
    },
    {
      title: 'L/P',
      dataIndex: 'jenis_kelamin',
      key: 'jenis_kelamin',
    },
    {
      title: 'Gol',
      dataIndex: 'golongan',
      key: 'golongan',
    },
    {
      title: 'Eselon',
      dataIndex: 'eselon',
      key: 'eselon',
    },
    {
      title: 'Jabatan',
      dataIndex: 'jabatan',
      key: 'jabatan',
      filters: jabatanFilters,
      filterMode: 'tree',
      onFilter: (value, record) => record.jabatan?.nama_jabatan === value,
      render: jabatan => <span>{jabatan?.nama_jabatan}</span>,
    },
    {
      title: 'Tempat Tugas',
      dataIndex: 'tempat_tugas',
      key: 'tempat_tugas',
      filters: tempatTugasFilters,
      filterMode: 'tree',
      onFilter: (value, record) => record.tempat_tugas?.kota === value,
      render: tempat_tugas => <span>{tempat_tugas.kota}</span>,
    },
    {
      title: 'Unit Kerja',
      dataIndex: 'unit_kerja',
      key: 'unit_kerja',
      filters: unitKerjaFilters,
      filterMode: 'tree',
      onFilter: (value, record) => record.unit_kerja?.nama_unit === value,
      render: unit_kerja => <span>{unit_kerja.nama_unit}</span>,
    },
    {
      title: 'No. HP',
      dataIndex: 'no_hp',
      key: 'no_hp',
    },
    {
      title: 'NPWP',
      dataIndex: 'npwp',
      key: 'npwp',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (_, record) => {
        return (
          <Space size='middle'>
            <Button
              onClick={() => handleView(record.pkid)}
              color='green'
              variant='outlined'
            >
              <FaEye />
            </Button>
            <Button
              onClick={() => handleEdit(record.pkid)}
              color='blue'
              variant='outlined'
            >
              <FaPencil />
            </Button>
            <Button
              onClick={() => handleDelete(record.pkid)}
              color='danger'
              variant='outlined'
            >
              <FaTrashCan />
            </Button>
          </Space>
        );
      },
    },
  ];

  const data = pegawaiData?.data.map((pegawai: PegawaiDetailProperty) => ({
    ...pegawai,
    key: pegawai.pkid.toString(),
  }));

  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      scroll={{ x: 'max-content' }}
    />
  );
};

export default PegawaiTable;
