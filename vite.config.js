import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';
import monacoEditorPluginModule from 'vite-plugin-monaco-editor';
const monacoEditorPlugin = monacoEditorPluginModule.default;
// --- FILE PATHS --- //
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '');
  return {
    // --- PLUGINS --- //
    plugins: [
      react({
        jsxRuntime: 'automatic',
      }),
      svgr(),
      VitePWA({
        registerType: 'autoUpdate',
        /* if you are using vite-plugin-pwa plugin version prior to 0.12.2
        add below lines to fix injectRegister bug.
      */
        workbox: {
          clientsClaim: true,
          skipWaiting: true,
        },
        /* If you want to check it on dev, add devOptions.
         */
        devOptions: {
          enabled: true,
        },
      }),
      monacoEditorPlugin({
        languageWorkers: ['json', 'css', 'html', 'typescript'],
      }),
    ],
    // --- CONFIG --- //
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@/humanIcons': path.resolve(__dirname, 'src/assets/humanIcons'),
        '@/routes': path.resolve(__dirname, 'src/routes'),
        '@/config': path.resolve(__dirname, 'src/config'),
        '@/colors': path.resolve(__dirname, 'src/assets/themes/base'),
        '@/lib': path.resolve(__dirname, 'src/lib'),
        app: path.resolve(__dirname, 'src/app'),
        api: path.resolve(__dirname, 'src/api'),
        assets: path.resolve(__dirname, 'src/assets'),
        components: path.resolve(__dirname, 'src/components'),
        config: path.resolve(__dirname, 'src/config'),
        contexts: path.resolve(__dirname, 'src/contexts'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        styles: path.resolve(__dirname, 'src/styles'),
        layouts: path.resolve(__dirname, 'src/layouts'),
        store: path.resolve(__dirname, 'src/store'),
        types: path.resolve(__dirname, 'src/types'),
        utils: path.resolve(__dirname, 'src/utils'),
        views: path.resolve(__dirname, 'src/views'),
      },
    },
    // --- DEFINE --- //
    define: {
      ...Object.keys(env).reduce((prev, key) => {
        prev[`process.env.${key}`] = JSON.stringify(env[key]);
        return prev;
      }, {}),
      // 'process.env.NODE_ENV': JSON.stringify('production'), // Corrected line
    },
    build: {
      rollupOptions: {
        external: ['monaco-editor'],
      },
    },
    // --- SERVER --- //
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
      hmr: {
        overlay: false,
      },
    },
  };
});
