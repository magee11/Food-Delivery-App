import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { join } from 'path';

const hostname = 'https://imaginative-chimera-bd0733.netlify.app/';

const links = [
  { url: '/', changefreq: 'daily', priority: 0.8 },
  { url: '/foods', changefreq: 'weekly', priority: 0.7 },
  { url: '/category', changefreq: 'weekly', priority: 0.7 },
  { url: '/mobile-app', changefreq: 'weekly', priority: 0.7 },
  { url: '/cart', changefreq: 'weekly', priority: 0.7 },
  { url: '/orders', changefreq: 'weekly', priority: 0.7 },
  { url: '/profile', changefreq: 'weekly', priority: 0.7 },
  { url: '/search', changefreq: 'weekly', priority: 0.7 },
];

const sitemap = new SitemapStream({ hostname });

streamToPromise(sitemap.pipe(createWriteStream(join(process.cwd(), 'public', 'sitemap.xml'))))
  .then(() => console.log('Sitemap written successfully.'))
  .catch((error) => console.error(error));

links.forEach(link => sitemap.write(link));
sitemap.end();
