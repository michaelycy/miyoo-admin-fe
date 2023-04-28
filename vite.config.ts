import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
// import { wrapperEnv } from './src/utils/getEnv';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteCompression from 'vite-plugin-compression';
import eslintPlugin from 'vite-plugin-eslint';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

import type { IViteEnvConfig } from './src/vite-env';

const parseViteEnvConfig = (conf: Record<string, string>) => {
  const env = {};

  for (const prop in conf) {
    if (Object.prototype.hasOwnProperty.call(conf, prop)) {
      const element = conf[prop];

      switch (prop as keyof IViteEnvConfig) {
        case 'VITE_PORT':
          if (element) {
            env[prop] = Number(element);
          }
          break;

        case 'VITE_OPEN':
        case 'VITE_REPORT':
        case 'VITE_BUILD_GZIP':
        case 'VITE_DROP_CONSOLE':
          env[prop] = element?.toLowerCase() === 'true';
          break;
        default:
          env[prop] = element;
          break;
      }
    }
  }

  return <IViteEnvConfig>env;
};

/** @see https://vitejs.dev/config */
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = parseViteEnvConfig(loadEnv(mode, process.cwd()));

  return <UserConfig>{
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_GLOB_APP_TITLE,
          },
        },
      }),
      // 使用 svg 图标
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      // EsLint 报错信息显示在浏览器界面上
      eslintPlugin(),
      // 是否生成包预览
      env.VITE_REPORT && visualizer(),
      // gzip compress
      env.VITE_BUILD_GZIP &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: 'gzip',
          ext: '.gz',
        }),
    ],
    esbuild: {
      pure: env.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: 'dist',
      // esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
      minify: 'esbuild',
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: env.VITE_DROP_CONSOLE,
      // 		drop_debugger: env.VITE_DROP_CONSOLE
      // 	}
      // },
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: env.VITE_PORT,
      open: env.VITE_OPEN,
      cors: true,
      // https: false,
      // proxy: {
      //   '/api': {
      //     target: '',
      //     changeOrigin: true,
      //     rewrite: path => path.replace(/^\/api/, ''),
      //   },
      // },
    },
  };
});
