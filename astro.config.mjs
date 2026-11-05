import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://thisweeknewsletter.com',
  output: 'static',
  redirects: {
    '/designs': '/',
    '/designs/soft': '/',
    '/designs/glass': '/',
    '/designs/agenda': '/',
    '/designs/bubbles': '/',
    '/designs/canvas': '/',
  },
  devToolbar: { enabled: false },
});
