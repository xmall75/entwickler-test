'use client';

import {
  PegawaiDetailProperty,
  pegawaiInitialValues,
  PegawaiInputProperty,
} from '@/types/pegawai';
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormProps,
  Input,
  Modal,
  Row,
  Typography,
  Upload,
} from 'antd';
import dayjs from 'dayjs';
import { TiUploadOutline } from 'react-icons/ti';

interface PegawaiModalProps {
  mode: 'create' | 'edit' | 'view';
  data: PegawaiDetailProperty | null | undefined;
  openModal: boolean;
  handleToggleModal: () => void;
}

const { Title } = Typography;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const PegawaiModal = ({
  mode,
  openModal,
  data,
  handleToggleModal,
}: PegawaiModalProps) => {
  const isInputDisabled = mode === 'view';

  const onFinish: FormProps<PegawaiInputProperty>['onFinish'] = values => {
    console.log('Form values:', values);
  };

  return (
    <Modal
      width={1000}
      open={openModal}
      onCancel={handleToggleModal}
      footer={[]}
    >
      <Form
        name='pegawai-form'
        layout='vertical'
        onFinish={onFinish}
        initialValues={pegawaiInitialValues}
        autoComplete='off'
      >
        <Title level={3}>
          {mode === 'create'
            ? 'Tambah Data'
            : mode === 'edit'
              ? 'Ubah Data'
              : 'Lihat Data'}
        </Title>

        <Row align='middle' justify='space-between' style={{ marginBottom: 1 }}>
          <Col span={11}>
            <label htmlFor='nip'>
              NIP{' '}
              <span
                style={{
                  color: 'red',
                  fontSize: '16px',
                }}
              >
                *
              </span>
            </label>
          </Col>
          <Col span={12}>
            <label htmlFor='nama_lengkap'>
              Nama Lengkap{' '}
              <span
                style={{
                  color: 'red',
                  fontSize: '16px',
                }}
              >
                *
              </span>
            </label>
          </Col>
        </Row>
        <Row align='middle' justify='space-between'>
          <Col span={11}>
            <Form.Item<PegawaiInputProperty>
              name='nip'
              style={{ width: '100%' }}
              initialValue={data?.nip}
              rules={[{ required: true, message: 'Tolong isi NIP anda' }]}
            >
              <Input id='nip' disabled={isInputDisabled} value={data?.nip} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<PegawaiInputProperty>
              name='nama_lengkap'
              style={{ width: '100%' }}
              initialValue={data?.nama_lengkap}
              rules={[
                { required: true, message: 'Tolong isi nama lengkap anda' },
              ]}
            >
              <Input
                id='nama_lengkap'
                disabled={isInputDisabled}
                value={data?.nama_lengkap}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row align='middle' justify='space-between' style={{ marginBottom: 1 }}>
          <Col span={11}>
            <label htmlFor='tempat_lahir'>
              Tempat Lahir{' '}
              <span
                style={{
                  color: 'red',
                  fontSize: '16px',
                }}
              >
                *
              </span>
            </label>
          </Col>
          <Col span={12}>
            <label htmlFor='tanggal_lahir'>
              Tanggal Lahir{' '}
              <span
                style={{
                  color: 'red',
                  fontSize: '16px',
                }}
              >
                *
              </span>
            </label>
          </Col>
        </Row>
        <Row align='middle' justify='space-between'>
          <Col span={11}>
            <Form.Item<PegawaiInputProperty>
              name='tempat_lahir'
              style={{ width: '100%' }}
              initialValue={data?.tempat_lahir}
              rules={[
                { required: true, message: 'Tolong isi tempat lahir anda' },
              ]}
            >
              <Input
                id='tempat_lahir'
                disabled={isInputDisabled}
                value={data?.nip}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<PegawaiInputProperty>
              name='tanggal_lahir'
              style={{ width: '100%' }}
              getValueProps={value => ({ value: value ? dayjs(value) : '' })}
              rules={[
                { required: true, message: 'Tolong isi tanggal lahir anda' },
              ]}
            >
              <DatePicker id='tanggal_lahir' style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row align='middle' justify='space-between' style={{ marginBottom: 1 }}>
          <Col span={11}>
            <label htmlFor='foto'>
              Foto{' '}
              <span
                style={{
                  color: 'red',
                  fontSize: '16px',
                }}
              >
                *
              </span>
            </label>
          </Col>
          <Col span={12}>
            <label htmlFor='alamat'>
              Alamat{' '}
              <span
                style={{
                  color: 'red',
                  fontSize: '16px',
                }}
              >
                *
              </span>
            </label>
          </Col>
        </Row>
        <Row align='middle' justify='space-between'>
          <Col span={11}>
            <Form.Item<PegawaiInputProperty>
              name='foto'
              style={{ width: '100%' }}
              valuePropName='fileList'
              getValueFromEvent={normFile}
            >
              <Upload
                id='foto'
                style={{ width: '100%' }}
                action='/api/upload'
                listType='picture'
              >
                <Button icon={<TiUploadOutline />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<PegawaiInputProperty>
              name='alamat'
              style={{ width: '100%' }}
              initialValue={data?.alamat}
              rules={[{ required: true, message: 'Tolong isi alamat anda' }]}
            >
              <Input id='alamat' disabled={isInputDisabled} value={data?.nip} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label={null}>
          <Button
            type='primary'
            htmlType={isInputDisabled ? 'button' : 'submit'}
            style={{
              visibility: isInputDisabled ? 'hidden' : 'visible',
            }}
          >
            {mode === 'create'
              ? 'Tambah'
              : mode === 'edit'
                ? 'Simpan'
                : 'Tutup'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PegawaiModal;
