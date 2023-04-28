import { useState, useEffect, useCallback } from 'react';

/** 获取浏览器当前语言 */
export const useNavigatorLanguage = (): Readonly<{ isSupported: boolean; language: string }> => {
  const navigator = window?.navigator;
  // 查看当前浏览器是否支持language
  const isSupported = Boolean(navigator && 'language' in navigator);
  // 存储当前language
  const [language, setLanguage] = useState(navigator?.language);

  const onLanguageChange = useCallback(
    () => (navigator ? setLanguage(navigator.language) : undefined),
    [navigator]
  );

  useEffect(() => {
    window.addEventListener('languagechange', onLanguageChange);

    return () => window.removeEventListener('languagechange', onLanguageChange);
  }, [onLanguageChange]);

  return { isSupported, language };
};
