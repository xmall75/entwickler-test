'use client';

import '@ant-design/v5-patch-for-react-19';
import { Tabs } from 'antd';
import PegawaiTable from './tables/PegawaiTable';

const SidebarContent = [
  {
    label: 'Pegawai',
    key: 'pegawai',
    children: <PegawaiTable />,
  },
  {
    label: 'Jabatan',
    key: 'jabatan',
    children: 'Content of Jabatan',
  },
  {
    label: 'Unit Kerja',
    key: 'unit-kerja',
    children: 'Content of Unit Kerja',
  },
  {
    label: 'Tempat Tugas',
    key: 'tempat-tugas',
    children: 'Content of Tempat Tugas',
  },
];

const DashboardContent = () => {
  return (
    <div style={{ padding: '48px 48px' }}>
      <Tabs
        defaultActiveKey='pegawai'
        tabPosition='left'
        items={SidebarContent}
      />
    </div>
  );
};

export default DashboardContent;
