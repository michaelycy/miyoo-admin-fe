declare global {
  // interface Window {}
  interface Navigator {
    // 兼容旧版语言
    browserLanguage: string;
  }
}
export {};
