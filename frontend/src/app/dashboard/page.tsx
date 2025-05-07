import Navbar from '@/components/Navbar';
import { Layout } from 'antd';
import DashboardContent from '@/components/DashboardContent';
import QueryClientComponent from '@/components/QueryClient';

const DashboardPage = () => {
  return (
    <Layout>
      <Navbar />
      <QueryClientComponent>
        <DashboardContent />
      </QueryClientComponent>
    </Layout>
  );
};

export default DashboardPage;
