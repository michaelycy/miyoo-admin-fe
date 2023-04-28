import { selector } from 'recoil';
// import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import { ELang } from '@/enums';

import 'dayjs/locale/zh-cn';

import type { Locale } from 'antd/es/locale';
import type { ThemeConfig } from 'antd';

dayjs.locale('zh');

export const theme: ThemeConfig = {
  token: {
    colorPrimary: 'red',
  },
};

export const i18nStore = selector<{ locale: Locale; lang: ELang }>({
  key: 'i18n',
  get: () => {
    console.log('get');
    return {
      lang: ELang.ZH_CN,
      locale: zhCN,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  set: () => {},
});
