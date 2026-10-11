// Build the same React application into a file that opens without a server.
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

const root = fileURLToPath(new URL('..', import.meta.url));
const result = await build({
  root,
  configFile: false,
  logLevel: 'warn',
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [react(), {
    name: 'local-preview-assets', enforce: 'pre',
    transform(code, id) {
      if (id.replaceAll('\\', '/').endsWith('/src/data/portfolio.js')) {
        return code.replaceAll("'/projects/", "'./public/projects/");
      }
    },
  }],
  build: {
    write: false, minify: 'esbuild', cssCodeSplit: false,
    lib: { entry: fileURLToPath(new URL('../src/main.jsx', import.meta.url)), name: 'Portfolio', formats: ['iife'] },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
const outputs = (Array.isArray(result) ? result : [result]).flatMap(bundle => bundle.output);
const js = outputs.filter(item => item.type === 'chunk').map(item => item.code).join('\n').replace(/<\/script/gi, '<\\/script');
const css = outputs.filter(item => item.type === 'asset' && item.fileName.endsWith('.css')).map(item => item.source).join('\n');
if (!js || !css) throw new Error('Preview bundle is incomplete');
const html = `<!doctype html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#0d1117"><title>고재혁 · Developer Portfolio</title><link rel="icon" href="./public/favicon.svg"><style>${css}</style></head><body><div id="root"></div><script>${js}</script></body></html>`;
await writeFile(new URL('../portfolio-preview.html', import.meta.url), html, 'utf8');
console.log('Created portfolio-preview.html from the production React components.');
