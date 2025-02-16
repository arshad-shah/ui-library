import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// These are the only dependencies we want to keep external
const externalPackages = ['react', 'react-dom', 'tailwindcss'];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/test/**'],
      outDir: 'dist/types',
      // Only emit .d.ts files to types directory
      rollupTypes: true,
      // Don't include types in the main build
      include: ['src'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: [...externalPackages],
      output: [
        {
          format: 'es',
          dir: 'dist/esm',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
          interop: 'auto',
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
          interop: 'auto',
        },
      ],
    },
    sourcemap: true,
    minify: 'terser',
    cssCodeSplit: true,
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: externalPackages,
  },
});
