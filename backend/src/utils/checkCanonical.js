import * as cheerio from 'cheerio';

export function checkCanonical(html) {
  const $ = cheerio.load(html);

  const href = $('link[rel="canonical"]').attr('href');

  return {
    exists: !!href,
    url: href || '',
    status: href ? 'good' : 'warning',
    message: href
      ? 'Canonical URL found.'
      : 'Canonical URL not found.',
  };
}