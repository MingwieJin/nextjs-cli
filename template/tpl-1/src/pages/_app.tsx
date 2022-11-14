import { AuthProvider } from '@/page-components/auth/authContext';
import { MainLayout as Layout } from '@/page-components/layout/MainLayout';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

require('@/styles/global.less');

function CustomApp({ Component, pageProps }: any) {
  return (
    <ConfigProvider locale={zhCN}>
      <AuthProvider>
        <div id="root">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default CustomApp;
