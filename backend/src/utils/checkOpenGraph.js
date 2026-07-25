import * as cheerio from 'cheerio';

export function checkOpenGraph(html) {
  const $ = cheerio.load(html);

  const required = [
    'og:title',
    'og:description',
    'og:image',
    'og:url',
  ];

  const found = {};

  let missing = 0;

  for (const property of required) {
    const value = $(`meta[property="${property}"]`).attr('content');

    found[property] = value || '';

    if (!value) {
      missing++;
    }
  }

  return {
    exists: missing === 0,
    found,
    status: missing === 0 ? 'good' : 'warning',
    message:
      missing === 0
        ? 'All required Open Graph tags found.'
        : `${missing} Open Graph tag(s) missing.`,
  };
}