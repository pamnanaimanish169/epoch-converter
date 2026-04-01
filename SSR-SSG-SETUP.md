### SSR + Static Pre-render (SSG) Setup Guide

This document records how to add **SSR + static pre-rendering** to a Vite + React project, so you can deploy to static hosting (like Hostinger Web Hosting) but still serve fully rendered HTML for many routes.

You can reuse this guide for future projects.

---

### 1. Create the SSR entry (`src/entry-server.tsx`)

Add a server entry that renders your existing `App` with `StaticRouter` and any providers (React Query, i18n, etc.).

```ts
// src/entry-server.tsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';
import './i18n'; // optional

export function render(url: string): string {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

  const app = (
    <StaticRouter location={url}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StaticRouter>
  );

  return renderToString(app);
}
```

**Browser-only guards** (important for SSR/SSG):

Whenever you touch `window`, `document`, `localStorage`, etc., guard it so it doesn’t run on the server:

```ts
// Example pattern for a hook like useTheme
const [theme, setTheme] = useState<'light' | 'dark'>(() => {
  if (typeof window === 'undefined') return 'dark'; // SSR default
  const saved = window.localStorage.getItem('theme') as 'light' | 'dark' | null;
  return saved || 'dark';
});

useEffect(() => {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');

  window.localStorage.setItem('theme', theme);
}, [theme]);
```

---

### 2. Make SEO URL building server-safe

When constructing canonical URLs and meta tags, avoid relying on `window` during SSR/SSG.

Pattern used in `App`:

```ts
// Base URL for the site (update to your production domain)
const baseUrl =
  typeof window !== 'undefined'
    ? window.location.origin
    : 'https://epoch-tools.com'; // or your domain

const currentUrl = `${baseUrl}${location.pathname}${location.search || ''}`;
```

Avoid calling `new URL(path)` without a base on the server; if you need `URL`, use `new URL(path, baseUrl)`.

---

### 3. Build both client and SSR bundles

Update `package.json` so the `build` script produces:

- the **client bundle** (`vite build`),
- the **SSR bundle** (`vite build --ssr`),
- and then runs the pre-render script (see next sections).

```jsonc
{
  "scripts": {
    "prebuild": "node scripts/generate-pseo-pages.js", // optional, if you generate pSEO data
    "build": "vite build && vite build --ssr src/entry-server.tsx --outDir dist/server && node scripts/prerender-static.js"
  }
}
```

You can adapt the `prebuild` line or remove it for projects that don’t need generated data.

---

### 4. Generate runtime data for prerendering (optional pSEO)

If you generate programmatic SEO data in TypeScript (e.g. dates, month hubs), create a **runtime JS module** that Node can import during prerendering.

Example extension to `scripts/generate-pseo-pages.js`:

```js
const OUTPUT_TS_PATH = path.join(PROJECT_ROOT, 'src', 'data', 'pseoDates.ts');
const OUTPUT_RUNTIME_JS_PATH = path.join(PROJECT_ROOT, 'data', 'pseoDatesRuntime.mjs');

function writeRuntimeJsFile(selectedEntries, monthHubs) {
  const datesArray = JSON.stringify(
    selectedEntries.map((entry) => ({
      date: entry.date,
      isGscLike: Boolean(entry.isGscLike),
    })),
  );
  const monthsArray = JSON.stringify(monthHubs);

  const jsContent = `// Auto-generated runtime data for prerendering. Do not edit manually.
export const PSEO_DAILY_DATES = ${datesArray};
export const PSEO_MONTH_HUBS = ${monthsArray};
`;

  fs.mkdirSync(path.dirname(OUTPUT_RUNTIME_JS_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_RUNTIME_JS_PATH, jsContent, 'utf8');
}

// After computing selectedEntries + monthHubs:
writeTsFile(selectedEntries, monthHubs);      // TS version for the app
writeRuntimeJsFile(selectedEntries, monthHubs); // JS version for Node prerender
```

If your project doesn’t have pSEO data, you can skip this and hard-code or statically list routes for prerendering.

---

### 5. Pre-render routes into static HTML (`scripts/prerender-static.js`)

This script:

- loads the SSR `render(url)` from `dist/server/entry-server.js`,
- reads `dist/index.html` as the base HTML template,
- defines a list of routes to prerender,
- renders each route to HTML and writes `dist/<route>/index.html`.

```js
// scripts/prerender-static.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PSEO_DAILY_DATES, PSEO_MONTH_HUBS } from '../data/pseoDatesRuntime.mjs';
import { render } from '../dist/server/entry-server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const templatePath = path.join(distDir, 'index.html');

// Example: hard-coded timezone codes (adapt to your project)
const TIMEZONE_CODES = [
  'ist','gmt','bst','wet','west','cet','cest','eet','eest','msk',
  'est','edt','cst','cdt','mst','mdt','pst','pdt','akst','akdt',
  'hst','ast','adt','jst','kst','cst-cn','aest','aedt','acst',
  'acdt','awst','gst','sgt','ict','cxt','wst','nzt','nzdt','chast',
  'chadt','tot','lint','mit'
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeHtmlFile(routePath, html) {
  const cleanPath = routePath === '/' ? '' : routePath.replace(/^\//, '');
  const outDir = path.join(distDir, cleanPath);
  ensureDir(outDir);
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
}

async function main() {
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Base template not found at ${templatePath}. Run "vite build" first.`);
  }
  const template = fs.readFileSync(templatePath, 'utf8');

  // 1) Static pages you always want
  const staticRoutes = [
    '/',
    '/about',
    '/faq',
    '/week-number',
    '/epoch-countdown',
    '/unix-countdown',
    '/timezones',
    '/freebies',
  ];

  // 2) Programmatic date/month pages (optional)
  const dateRoutes = PSEO_DAILY_DATES.map((entry) => `/unix-timestamp/${entry.date}`);
  const monthRoutes = PSEO_MONTH_HUBS.map((m) => `/unix-timestamps/${m}`);

  // 3) Programmatic timezone pages (optional)
  const timezoneRoutes = TIMEZONE_CODES.map((code) => `/epoch-to-${code}`);

  const allRoutes = Array.from(
    new Set([...staticRoutes, ...dateRoutes, ...monthRoutes, ...timezoneRoutes]),
  );

  console.log(`Pre-rendering ${allRoutes.length} routes...`);

  for (const url of allRoutes) {
    try {
      const appHtml = await render(url);
      const fullHtml = template.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`,
      );
      writeHtmlFile(url, fullHtml);
      console.log(`✓ ${url}`);
    } catch (err) {
      console.error(`✗ Failed to prerender ${url}:`, err.message || err);
    }
  }

  console.log('Pre-rendering completed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

Update `package.json` to chain this after both Vite builds:

```jsonc
"scripts": {
  "prebuild": "node scripts/generate-pseo-pages.js",
  "build": "vite build && vite build --ssr src/entry-server.tsx --outDir dist/server && node scripts/prerender-static.js"
}
```

You can remove the `prebuild` step in projects that don’t need generated data.

---

### 6. Deployment to static hosting (e.g., Hostinger Web Hosting)

For static-only hosts (no Node.js runtime):

1. Run locally:
   - `npm run build`
2. Take the **contents of `dist/`** and upload them to your host’s web root (e.g., `public_html`):
   - `index.html`
   - `assets/` directory
   - All generated route folders:
     - `week-number/index.html`
     - `unix-timestamp/YYYY-MM-DD/index.html`
     - `unix-timestamps/YYYY-MM/index.html`
     - `epoch-to-<code>/index.html`
   - `sitemap.xml` if you generate one.
3. After deploy, verify a few URLs by visiting them directly and using “View Page Source”:
   - Home: `/`
   - Key feature page: e.g. `/week-number`
   - One date page: e.g. `/unix-timestamp/2026-12-31`
   - One timezone page: e.g. `/epoch-to-ist`

Each should show **full HTML content in the page source**, while still hydrating into a SPA once JS loads.

---

### 7. Summary checklist for new projects

- **[ ]** Add `src/entry-server.tsx` with `render(url)` using `StaticRouter` and your providers.
- **[ ]** Add SSR-safe guards around all `window`/`document`/`localStorage` usage.
- **[ ]** Make SEO URL construction server-safe (fallback `baseUrl`, no bare `new URL()`).
- **[ ]** Ensure `package.json` `build` does:
  - `vite build`
  - `vite build --ssr src/entry-server.tsx --outDir dist/server`
  - `node scripts/prerender-static.js`
- **[ ]** (Optional) Generate runtime JS data for programmatic routes.
- **[ ]** Deploy the `dist/` contents to static hosting and spot-check key URLs with “View Page Source”.

