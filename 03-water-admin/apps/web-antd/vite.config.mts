import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    base: '/water-admin/',
    vite: {
      server: {
        port: 9003,
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:8080/api',
            ws: true,
          },
        },
      },
    },
  };
});
