import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

// --- FILE PATHS --- //
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '');
  return {
    // --- PLUGINS --- //
    // react() -- For React JSX
    // svgr() -- For importing SVGs as React components
    // tsconfigPaths() -- For resolving paths in tsconfig.json
    plugins: [
      react({
        jsxRuntime: 'automatic',
      }),
      svgr(),
    ],
    // --- CONFIG --- //
    // root -- The root directory of the project
    // base -- The base URL of the project
    // root: path.resolve(__dirname, 'src'),
    // base: '/',
    // --- RESOLVE --- //
    // alias -- Aliases for paths
    // resolve.alias -- Aliases for paths
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        // '@/': path.resolve(__dirname, 'src'),
        '@/humanIcons': path.resolve(__dirname, 'src/assets/humanIcons'),
        '@/routes': path.resolve(__dirname, 'src/routes'),
        '@/config': path.resolve(__dirname, 'src/config'),
        '@/colors': path.resolve(__dirname, 'src/assets/themes/base'),
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
    // define -- Define global variables
    // define.process.env -- Define global variables
    // define.process.env.NODE_ENV -- Define global variables
    define: {
      ...Object.keys(env).reduce((prev, key) => {
        prev[`process.env.${key}`] = JSON.stringify(env[key]);
        return prev;
      }, {}),
      // 'process.env.NODE_ENV': JSON.stringify('production'), // Corrected line
    },
    // --- SERVER --- //
    // port -- The port to run the server on
    // open -- Open the browser on server start
    // proxy -- Proxy requests to the API
    // hmr.overlay -- Disable the HMR overlay
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
