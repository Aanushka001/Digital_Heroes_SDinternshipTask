import * as cheerio from 'cheerio';

export function checkTwitterCard(html) {
  const $ = cheerio.load(html);

  const required = [
    'twitter:card',
    'twitter:title',
    'twitter:description',
    'twitter:image',
  ];

  const found = {};

  let missing = 0;

  for (const name of required) {
    const value = $(`meta[name="${name}"]`).attr('content');

    found[name] = value || '';

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
        ? 'All required Twitter Card tags found.'
        : `${missing} Twitter Card tag(s) missing.`,
  };
}