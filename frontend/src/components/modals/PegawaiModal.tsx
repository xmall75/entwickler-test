/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Radio,
  Row,
  Select,
  Typography,
  Upload,
} from 'antd';
import Image from 'next/image';
import dayjs from 'dayjs';
import { TiUploadOutline } from 'react-icons/ti';
import { useGetAllJabatan } from '@/hooks/api/jabatan/useGetAllJabatan';
import { useGetAllUnitKerja } from '@/hooks/api/unit_kerja/useGetAllUnitKerja';
import { useGetAllTempatTugas } from '@/hooks/api/tempat_tugas/useGetAllTempatTugas';
import { JabatanProperty } from '@/types/jabatan';
import { UnitKerjaProperty } from '@/types/unit_kerja';
import { TempatTugasProperty } from '@/types/tempat_tugas';
import { useCreatePegawai } from '@/hooks/api/pegawai/useCreatePegawai';
import { useUpdatePegawai } from '@/hooks/api/pegawai/useUpdatePegawai';

interface PegawaiModalProps {
  mode: 'create' | 'edit' | 'view';
  data: PegawaiDetailProperty | null | undefined;
  openModal: boolean;
  successNotification: (message: string, description: string) => void;
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
  successNotification,
  handleToggleModal,
}: PegawaiModalProps) => {
  const isInputDisabled = mode === 'view';

  const { data: jabatanData } = useGetAllJabatan();
  const { data: unitKerjaData } = useGetAllUnitKerja();
  const { data: tempatTugasData } = useGetAllTempatTugas();

  const { mutateAsync: createPegawai } = useCreatePegawai();
  const { mutateAsync: editPegawai } = useUpdatePegawai();

  const onFinish: FormProps<PegawaiInputProperty>['onFinish'] =
    async values => {
      const formData = {
        nip: values.nip,
        foto: values.foto,
        nama_lengkap: values.nama_lengkap,
        tempat_lahir: values.tempat_lahir,
        tanggal_lahir: values.tanggal_lahir,
        alamat: values.alamat,
        golongan: values.golongan,
        eselon: values.eselon,
        no_hp: values.no_hp,
        npwp: values.npwp,
        jenis_kelamin: values.jenis_kelamin,
        agama: values.agama,
        jabatan_pkid: values.jabatan_pkid,
        unit_kerja_pkid: values.unit_kerja_pkid,
        tempat_tugas_pkid: values.tempat_tugas_pkid,
      };

      if (mode === 'create') {
        try {
          await createPegawai(formData);
          successNotification(
            'Berhasil menambahkan pegawai',
            'Pegawai berhasil ditambahkan. Silakan cek tabel kembali.',
          );
          handleToggleModal();
        } catch (error) {
          console.error('Error deleting pegawai:', error);
        }
      } else if (mode === 'edit') {
        try {
          await editPegawai({ pkid: data?.pkid as number, data: formData });
          successNotification(
            'Berhasil mengubah pegawai',
            'Pegawai berhasil diubah. Silakan cek tabel kembali.',
          );
          handleToggleModal();
        } catch (error) {
          console.error('Error updating pegawai:', error);
        }
      } else {
        handleToggleModal();
      }
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
        initialValues={data ? data : pegawaiInitialValues}
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
              rules={[{ required: true, message: 'Tolong isi NIP anda' }]}
            >
              <Input id='nip' disabled={isInputDisabled} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<PegawaiInputProperty>
              name='nama_lengkap'
              style={{ width: '100%' }}
              rules={[
                { required: true, message: 'Tolong isi nama lengkap anda' },
              ]}
            >
              <Input id='nama_lengkap' disabled={isInputDisabled} />
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
              rules={[
                { required: true, message: 'Tolong isi tempat lahir anda' },
              ]}
            >
              <Input id='tempat_lahir' disabled={isInputDisabled} />
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
              <DatePicker
                id='tanggal_lahir'
                disabled={isInputDisabled}
                style={{ width: '100%' }}
              />
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
              valuePropName={data?.foto ? undefined : 'fileList'}
              getValueFromEvent={normFile}
            >
              <Upload
                id='foto'
                style={{ width: '100%' }}
                action='/api/upload'
                listType='picture'
                disabled={isInputDisabled}
              >
                <Button icon={<TiUploadOutline />}>
                  Click to upload photo
                </Button>
              </Upload>
            </Form.Item>
            {data?.foto && (
              <Image
                width={100}
                height={60}
                src={`/uploads/${data.foto}`}
                alt='Foto Pegawai'
              />
            )}
          </Col>
          <Col span={12}>
            <Form.Item<PegawaiInputProperty>
              name='alamat'
              style={{ width: '100%' }}
              rules={[{ required: true, message: 'Tolong isi alamat anda' }]}
            >
              <Input id='alamat' disabled={isInputDisabled} />
            </Form.Item>
          </Col>
        </Row>

        <Row align='middle' justify='space-between' style={{ marginBottom: 1 }}>
          <Col span={11}>
            <label htmlFor='golongan'>
              Golongan{' '}
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
            <label htmlFor='eselon'>
              Eselon{' '}
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
              name='golongan'
              style={{ width: '100%' }}
              rules={[{ required: true, message: 'Tolong isi golongan anda' }]}
            >
              <Input id='golongan' disabled={isInputDisabled} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<PegawaiInputProperty>
              name='eselon'
              style={{ width: '100%' }}
              rules={[{ required: true, message: 'Tolong isi eselon anda' }]}
            >
              <Input id='eselon' disabled={isInputDisabled} />
            </Form.Item>
          </Col>
        </Row>

        <Row align='middle' justify='space-between' style={{ marginBottom: 1 }}>
          <Col span={11}>
            <label htmlFor='no_hp'>
              Nomor HP{' '}
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
            <label htmlFor='npwp'>
              NPWP{' '}
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
              name='no_hp'
              style={{ width: '100%' }}
              rules={[
                { required: true, message: 'Tolong isi nomor handphone anda' },
              ]}
            >
              <Input id='no_hp' disabled={isInputDisabled} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<PegawaiInputProperty>
              name='npwp'
              style={{ width: '100%' }}
              rules={[{ required: true, message: 'Tolong isi NPWP anda' }]}
            >
              <Input id='npwp' disabled={isInputDisabled} />
            </Form.Item>
          </Col>
        </Row>

        <Row align='middle' justify='space-between' style={{ marginBottom: 1 }}>
          <Col span={11}>
            <label htmlFor='jenis_kelamin'>
              Jenis Kelamin{' '}
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
            <label htmlFor='agama'>
              Agama{' '}
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
              name='jenis_kelamin'
              style={{ width: '100%' }}
              rules={[
                { required: true, message: 'Tolong isi jenis kelamin anda' },
              ]}
            >
              <Radio.Group id='jenis_kelamin' disabled={isInputDisabled}>
                <Radio value='L'>Pria</Radio>
                <Radio value='P'>Wanita</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<PegawaiInputProperty>
              name='agama'
              style={{ width: '100%' }}
              rules={[{ required: true, message: 'Tolong isi agama anda' }]}
            >
              <Input id='agama' disabled={isInputDisabled} />
            </Form.Item>
          </Col>
        </Row>

        <Row align='middle' justify='space-between' style={{ marginBottom: 1 }}>
          <Col span={7}>
            <label htmlFor='jabatan_pkid'>
              Jabatan{' '}
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
          <Col span={8}>
            <label htmlFor='unit_kerja_pkid'>
              Unit Kerja{' '}
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
          <Col span={8}>
            <label htmlFor='tempat_tugas_pkid'>
              Tempat Tugas{' '}
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
          <Col span={7}>
            <Form.Item<PegawaiInputProperty>
              name='jabatan_pkid'
              style={{ width: '100%' }}
              rules={[{ required: true, message: 'Tolong isi jabatan anda' }]}
            >
              <Select id='jabatan_pkid' disabled={isInputDisabled}>
                {jabatanData?.data.map((jabatan: JabatanProperty) => (
                  <Select.Option key={jabatan.pkid} value={jabatan.pkid}>
                    {jabatan.nama_jabatan}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<PegawaiInputProperty>
              name='unit_kerja_pkid'
              style={{ width: '100%' }}
              rules={[
                { required: true, message: 'Tolong isi unit kerja anda' },
              ]}
            >
              <Select id='unit_kerja_pkid' disabled={isInputDisabled}>
                {unitKerjaData?.data.map((unit_kerja: UnitKerjaProperty) => (
                  <Select.Option key={unit_kerja.pkid} value={unit_kerja.pkid}>
                    {unit_kerja.nama_unit}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<PegawaiInputProperty>
              name='tempat_tugas_pkid'
              style={{ width: '100%' }}
              rules={[
                { required: true, message: 'Tolong isi tempat tugas anda' },
              ]}
            >
              <Select id='tempat_tugas_pkid' disabled={isInputDisabled}>
                {tempatTugasData?.data.map(
                  (tempat_tugas: TempatTugasProperty) => (
                    <Select.Option
                      key={tempat_tugas.pkid}
                      value={tempat_tugas.pkid}
                    >
                      {tempat_tugas.provinsi} - {tempat_tugas.kota}
                    </Select.Option>
                  ),
                )}
              </Select>
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
