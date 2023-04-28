import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { ConfigProvider } from 'antd';
import { i18nStore } from '@/store/theme';

import './index.css';
import App from './App.tsx';

// eslint-disable-next-line react-refresh/only-export-components
const RootApp = () => {
  const { locale } = useRecoilValue(i18nStore);

  return (
    <ConfigProvider locale={locale} theme={{ token: { colorPrimary: 'red' } }}>
      <App />
    </ConfigProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <RootApp />
    </RecoilRoot>
  </StrictMode>
);
