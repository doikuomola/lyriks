// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';

const viteEnv = {};
Object.keys(process.env).forEach((key) => {
  if (key.startsWith('VITE_')) {
    viteEnv[`import.meta.env.${key}`] = process.env[key];
  }
});

export default {
  alias: {
    // eslint-disable-next-line global-require
    '@': require('path').resolve(__dirname, 'src'),
  },
  define: viteEnv,
  plugins: [react()],
};
