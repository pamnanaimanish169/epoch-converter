import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolve = (p) => path.resolve(__dirname, '..', p);

const isProd = process.env.NODE_ENV === 'production';
const app = express();
const port = process.env.SSR_PORT || 4173;

if (!isProd) {
  // This server is meant for production SSR only.
  console.warn('ssr-server.js is running in non-production mode; SSR server is intended for production builds.');
}

// Serve built client assets from Vite's default dist output
app.use(
  express.static(resolve('dist'), {
    index: false,
    maxAge: '1y',
  }),
);

let template;
let render;

async function init() {
  const templatePath = resolve('dist/index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(
      `index.html not found at ${templatePath}. Make sure to run "npm run build" before starting the SSR server.`,
    );
  }

  template = fs.readFileSync(templatePath, 'utf-8');

  const serverEntryPath = resolve('dist/server/entry-server.js');
  if (!fs.existsSync(serverEntryPath)) {
    throw new Error(
      `SSR bundle not found at ${serverEntryPath}. Make sure "vite build --ssr src/entry-server.tsx --outDir dist/server" ran successfully.`,
    );
  }

  const serverModule = await import(serverEntryPath);
  if (typeof serverModule.render !== 'function') {
    throw new Error('SSR server entry must export a "render(url: string)" function.');
  }
  render = serverModule.render;
}

app.get('*', async (req, res, next) => {
  try {
    if (!template || !render) {
      await init();
    }

    const url = req.originalUrl;
    const appHtml = await render(url);

    const html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`,
    );

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (err) {
    next(err);
  }
});

app.use((err, _req, res, _next) => {
  console.error('SSR error:', err);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`SSR server listening on http://localhost:${port}`);
});

