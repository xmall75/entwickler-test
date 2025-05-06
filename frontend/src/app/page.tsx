import LoginForm from '@/components/LoginForm';
import { Flex } from 'antd';

export default function Home() {
  return (
    <Flex
      justify='center'
      align='center'
      style={{
        height: '100vh',
      }}
    >
      <LoginForm />
    </Flex>
  );
}
