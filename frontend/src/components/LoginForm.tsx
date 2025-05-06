'use client';

import '@ant-design/v5-patch-for-react-19';
import { Button, Form, FormProps, Input, Typography } from 'antd';

type FieldType = {
  username?: string;
  password?: string;
};

const { Title, Paragraph } = Typography;

const LoginForm = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = () => {
    window.location.href = '/dashboard';
  };

  return (
    <Form
      name='basic'
      labelCol={{ span: 4 }}
      style={{
        background: '#eeeeee',
        maxWidth: 600,
        padding: 20,
      }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete='off'
    >
      <Title level={2}>Login</Title>
      <Paragraph>
        Fitur login belum tersedia, silahkan klik submit untuk langsung menuju
        ke dashboard.
      </Paragraph>
      <Form.Item<FieldType> label='Username' name='username'>
        <Input />
      </Form.Item>

      <Form.Item<FieldType> label='Password' name='password'>
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
