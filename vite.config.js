import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

// Loads .env.local manually so the API handler can read STRIPE_SECRET_KEY in dev
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*"?([^"]*)"?$/);
    if (m) process.env[m[1]] = m[2];
  }
}

// Dev-only middleware that serves files inside /api as serverless functions,
// mirroring how Vercel runs them in production.
const vercelApiPlugin = () => ({
  name: 'vercel-api-dev',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url?.startsWith('/api/')) return next();
      const route = req.url.split('?')[0].replace('/api/', '');
      const fnPath = path.resolve(process.cwd(), 'api', `${route}.js`);
      if (!fs.existsSync(fnPath)) return next();

      try {
        // Bust the import cache so edits to the API file are picked up without restart.
        // pathToFileURL is required on Windows — raw paths like C:\... aren't valid ESM URLs.
        const fnUrl = `${pathToFileURL(fnPath).href}?t=${Date.now()}`;
        const mod = await import(fnUrl);
        const handler = mod.default;

        // Collect request body
        let body = '';
        for await (const chunk of req) body += chunk;
        req.body = body ? JSON.parse(body) : {};

        // Polyfill Vercel's res.status().json() helpers
        res.status = code => { res.statusCode = code; return res; };
        res.json = data => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return res;
        };

        await handler(req, res);
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  },
});

export default defineConfig({
  plugins: [
    react(),
    vercelApiPlugin(),
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
