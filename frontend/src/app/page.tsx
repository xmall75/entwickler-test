import LoginForm from '@/components/LoginForm';
import QueryClientComponent from '@/components/QueryClient';
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
      <QueryClientComponent>
        <LoginForm />
      </QueryClientComponent>
    </Flex>
  );
}
