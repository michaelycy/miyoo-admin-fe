/// <reference types="vite/client" />
export interface IViteEnvConfig {
  readonly VITE_API_URL: string;
  readonly VITE_PORT: number;
  readonly VITE_OPEN: boolean;
  readonly VITE_GLOB_APP_TITLE: string;
  readonly VITE_DROP_CONSOLE: boolean;
  readonly VITE_PROXY_URL: string;
  readonly VITE_BUILD_GZIP: boolean;
  readonly VITE_REPORT: boolean;
}
