import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,  // Ensures the `types` entry in `package.json` is valid
    }),
  ],
  build: {
    lib: {
      entry: './lib/index.ts', // Entry point of your component
      name: 'Datetimepicker',
      fileName: (format) => `datetimepicker.${format}.js`,
      formats: ['es', 'umd'],  // UMD for browser usage, ESM for modern builds
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@emotion/react', '@emotion/styled'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@emotion/react': 'emotionReact',
          '@emotion/styled': 'emotionStyled',
        },
      },
    },
    sourcemap: true,
  },
});
