'use client';

import {
  Button,
  Flex,
  Input,
  notification,
  Popconfirm,
  Space,
  Table,
} from 'antd';
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
import { useDeletePegawai } from '@/hooks/api/pegawai/useDeletePegawai';
import { useEffect, useState } from 'react';
import PegawaiModal from '../modals/PegawaiModal';

interface DataType extends PegawaiDetailProperty {
  key: string;
}

const PegawaiTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<'view' | 'create' | 'edit'>('view');
  const [chosenData, setChosenData] = useState<PegawaiDetailProperty | null>(
    null,
  );

  const [search, setSearch] = useState('');

  const { data: pegawaiData, refetch } = useGetAllPegawai();
  const { data: jabatanData } = useGetAllJabatan();
  const { data: tempatTugasData } = useGetAllTempatTugas();
  const { data: unitKerjaData } = useGetAllUnitKerja();

  const { mutateAsync: deletePegawai } = useDeletePegawai();

  const [initialData, setInitialData] = useState<DataType[]>([]);

  const [api, contextHolder] = notification.useNotification();

  const successNotification = (message: string, description: string) => {
    api['success']({
      message: message,
      description: description,
      placement: 'bottomRight',
    });
  };

  useEffect(() => {
    if (pegawaiData) {
      const searched = pegawaiData.data.filter(
        (pegawai: PegawaiDetailProperty) =>
          String(pegawai.nama_lengkap)
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          String(pegawai.nip).toLowerCase().includes(search.toLowerCase()) ||
          String(pegawai.npwp).toLowerCase().includes(search.toLowerCase()) ||
          String(pegawai.no_hp).toLowerCase().includes(search.toLowerCase()),
      );

      const newData = searched?.map((pegawai: PegawaiDetailProperty) => ({
        ...pegawai,
        key: pegawai.pkid.toString(),
      }));

      setInitialData(newData);
    }
  }, [search, pegawaiData]);

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

  const handleToggleModal = () => {
    refetch();
    setOpenModal(!openModal);
  };

  const handleView = (data: PegawaiDetailProperty) => {
    setMode('view');
    setChosenData(data);
    handleToggleModal();
  };

  const handleEdit = (data: PegawaiDetailProperty) => {
    setMode('edit');
    setChosenData(data);
    handleToggleModal();
  };

  const handleDelete = async (pkid: number) => {
    try {
      await deletePegawai(pkid);
      successNotification(
        'Data berhasil dihapus',
        'Berhasil menghapus data. Silahkan cek tabel kembali.',
      );
      refetch();
    } catch (error) {
      console.error('Error deleting pegawai:', error);
    }
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'NIP',
      dataIndex: 'nip',
      key: 'nip',
      fixed: 'left',
      render: text => <span className='font-bold'>{text}</span>,
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
              onClick={() => handleView(record)}
              color='green'
              variant='outlined'
            >
              <FaEye />
            </Button>
            <Button
              onClick={() => handleEdit(record)}
              color='blue'
              variant='outlined'
            >
              <FaPencil />
            </Button>
            <Popconfirm
              title='Hapus data'
              description='Apakah anda yakin ingin menghapus data ini?'
              onConfirm={() => handleDelete(record.pkid)}
              okText='Yes'
              cancelText='No'
            >
              <Button color='danger' variant='outlined'>
                <FaTrashCan />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      {contextHolder}
      <Flex justify='space-between' align='center' style={{ marginBottom: 16 }}>
        <Input
          placeholder='Cari pegawai'
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <Button
          color='blue'
          variant='solid'
          onClick={() => {
            setMode('create');
            setChosenData(null);
            handleToggleModal();
          }}
        >
          Tambah Pegawai
        </Button>
      </Flex>
      <PegawaiModal
        key={`${chosenData?.pkid} ${mode}`}
        mode={mode}
        openModal={openModal}
        data={chosenData}
        successNotification={successNotification}
        handleToggleModal={handleToggleModal}
      />
      <Table<DataType>
        columns={columns}
        dataSource={initialData}
        scroll={{ x: 'max-content' }}
      />
    </>
  );
};

export default PegawaiTable;
