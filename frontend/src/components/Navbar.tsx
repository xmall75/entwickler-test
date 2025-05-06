'use client';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Title
        level={3}
        style={{
          color: 'white',
          margin: 0,
        }}
      >
        Dashboard
      </Title>
    </Header>
  );
};

export default Navbar;
