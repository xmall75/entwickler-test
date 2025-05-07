'use client';

import { PegawaiDetailProperty, PegawaiInputProperty } from '@/types/pegawai';
import { Button, Form, Input, Modal, Typography } from 'antd';

interface PegawaiModalProps {
  mode: 'create' | 'edit' | 'view';
  data: PegawaiDetailProperty | null | undefined;
  openModal: boolean;
  handleToggleModal: () => void;
}

const { Title } = Typography;

const PegawaiModal = ({
  mode,
  openModal,
  data,
  handleToggleModal,
}: PegawaiModalProps) => {
  const isInputDisabled = mode === 'view';

  return (
    <Form
      name='pegawai-form'
      labelCol={{ span: 4 }}
      // onFinish={onFinish}
      autoComplete='off'
    >
      <Modal
        width={1000}
        open={openModal}
        onCancel={handleToggleModal}
        footer={[
          <Form.Item key='submit' label={null}>
            <Button
              type='primary'
              htmlType={mode !== 'view' ? 'submit' : undefined}
              onClick={isInputDisabled ? handleToggleModal : undefined}
            >
              {mode === 'create'
                ? 'Tambah'
                : mode === 'edit'
                  ? 'Simpan'
                  : 'Tutup'}
            </Button>
          </Form.Item>,
        ]}
      >
        <Title level={3}>
          {mode === 'create'
            ? 'Tambah Data'
            : mode === 'edit'
              ? 'Ubah Data'
              : 'Lihat Data'}
        </Title>

        <Form.Item<PegawaiInputProperty>
          label='NIP'
          name='nip'
          initialValue={data?.nip}
          rules={[{ required: true, message: 'Tolong isi NIP anda' }]}
        >
          <Input disabled={isInputDisabled} value={data?.nip} />
        </Form.Item>

        <Form.Item<PegawaiInputProperty>
          label='Nama Lengkap'
          name='nama_lengkap'
          initialValue={data?.nama_lengkap}
          rules={[{ required: true, message: 'Tolong isi nama lengkap anda' }]}
        >
          <Input disabled={isInputDisabled} value={data?.nama_lengkap} />
        </Form.Item>
      </Modal>
    </Form>
  );
};

export default PegawaiModal;
