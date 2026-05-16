import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Phase 1: serving from spadithya.github.io/AdiWebsite/
  // Phase 4: switch site to 'https://spadida.org' and remove base
  site: 'https://spadithya.github.io',
  base: '/AdiWebsite',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
});
