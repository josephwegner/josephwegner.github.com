import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://joewegner.com',
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  redirects: {
    '/tray-keen': 'https://web.archive.org/web/20230324114806/https://tray.io/blog/how-keen-io-builds-internal-integrations-tracks-customer-engagement',
    '/cmstickers': 'https://drive.google.com/file/d/1NvGC4YPe9X69H8hSxzk06VBUdG2dJ98Z/view?usp=sharing',
    '/static-things': 'https://tech.bellycard.com/blog/static-all-the-things/',
    '/oss': '/blog/open-source-for-real-companies',
    '/remote': '/blog/remote-work-like-youre-remote',
    '/questions': '/blog/startup-interview-questions',
    '/learn-svg': '/blog/learning-svg-with-logos',
    '/resume': 'https://www.dropbox.com/s/zwu1i3ohq9hnl8t/Joe%20Wegner%27s%20Resume.pdf?dl=0',
  },
});
