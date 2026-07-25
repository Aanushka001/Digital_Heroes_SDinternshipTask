import * as cheerio from 'cheerio';

export function checkStructuredData(html) {
  const $ = cheerio.load(html);

  const scripts = $('script[type="application/ld+json"]');

  const schemas = [];

  scripts.each((_, element) => {
    const json = $(element).html();

    if (json) {
      schemas.push(json.trim());
    }
  });

  return {
    exists: schemas.length > 0,
    count: schemas.length,
    status: schemas.length > 0 ? 'good' : 'warning',
    message:
      schemas.length > 0
        ? `${schemas.length} structured data block(s) found.`
        : 'No structured data found.',
  };
}