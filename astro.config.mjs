import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Live at spadida.org via Cloudflare DNS → GitHub Pages.
  // The public/CNAME file tells GitHub Pages which domain to serve.
  site: 'https://spadida.org',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
});
