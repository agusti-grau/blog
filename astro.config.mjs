import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://agusti-grau.github.io',
  base: '/blog/',
  output: 'static',
  integrations: [mdx(), sitemap()],
});
