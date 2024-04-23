import Header from 'app/components/Header';
import { Outlet } from 'react-router';
import { Divider, Layout } from 'antd';
import Sidebar from 'app/components/sidebar/sidebar';

function LayoutMain() {
  return (
    <Layout>
      <Header />
      <Sidebar routes={[]} />
      <Divider style={{ margin: 0 }} />
      <Layout.Content className="layout-content">
        <div className="container mt-24">
          <Outlet />
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default LayoutMain;
