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

// Hard-coded list of timezone codes matching getAllTimezoneCodes()
const TIMEZONE_CODES = [
  'ist',
  'gmt',
  'bst',
  'wet',
  'west',
  'cet',
  'cest',
  'eet',
  'eest',
  'msk',
  'est',
  'edt',
  'cst',
  'cdt',
  'mst',
  'mdt',
  'pst',
  'pdt',
  'akst',
  'akdt',
  'hst',
  'ast',
  'adt',
  'jst',
  'kst',
  'cst-cn',
  'aest',
  'aedt',
  'acst',
  'acdt',
  'awst',
  'gst',
  'sgt',
  'ict',
  'cxt',
  'wst',
  'nzt',
  'nzdt',
  'chast',
  'chadt',
  'tot',
  'lint',
  'mit',
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeHtmlFile(routePath, html) {
  const cleanPath = routePath === '/' ? '' : routePath.replace(/^\//, '');
  const outDir = path.join(distDir, cleanPath);
  ensureDir(outDir);
  const outFile = path.join(outDir, 'index.html');
  fs.writeFileSync(outFile, html, 'utf8');
}

async function main() {
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Base template not found at ${templatePath}. Run "vite build" before prerendering.`);
  }
  const template = fs.readFileSync(templatePath, 'utf8');

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

  const dateRoutes = PSEO_DAILY_DATES.map((entry) => `/unix-timestamp/${entry.date}`);
  const monthRoutes = PSEO_MONTH_HUBS.map((m) => `/unix-timestamps/${m}`);

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

