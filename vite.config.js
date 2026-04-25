import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    // Auto-compresses images on build — JPEGs drop to ~80% quality, PNGs losslessly optimised
    ViteImageOptimizer({
      jpg: { quality: 75 },
      jpeg: { quality: 75 },
      png: { quality: 80 },
      webp: { quality: 75 },
    }),
  ],
  server: {
    host: true, // exposes dev server on local network so phones can connect
  },
});
