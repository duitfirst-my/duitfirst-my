import allCards from '../data/all-card-data.json';
import type { APIRoute } from 'astro';
import type { Card } from '../types';

const baseUrl = 'https://www.duitfirst.my';

export const GET: APIRoute = () => {
  const urls = [
    '/',
    '/contact/',
    ...(allCards as Card[]).map((card) => card.localPageUrl)
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
    .map((url) => `\n  <url>\n    <loc>${baseUrl}${url}</loc>\n  </url>`)
    .join('')}\n</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};
