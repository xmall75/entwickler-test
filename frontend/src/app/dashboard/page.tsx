import Navbar from '@/components/Navbar';
import { Layout } from 'antd';
import DashboardContent from '@/components/DashboardContent';

const DashboardPage = () => {
  return (
    <Layout>
      <Navbar />
      <DashboardContent />
    </Layout>
  );
};

export default DashboardPage;
