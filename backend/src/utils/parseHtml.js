import * as cheerio from 'cheerio';

export function parseHtml(html) {
  const $ = cheerio.load(html);

  const title = $('title').first().text().trim();

  const metaDescription = $('meta[name="description"]')
    .attr('content')
    ?.trim() || '';

  const h1Count = $('h1').length;

  const images = $('img').toArray();

  const missingAltCount = images.filter((img) => {
    const alt = $(img).attr('alt');
    return !alt || alt.trim() === '';
  }).length;

  const text = $('body').text().replace(/\s+/g, ' ').trim();

  const wordCount = text === '' ? 0 : text.split(' ').length;

  return {
    title,
    metaDescription,
    h1Count,
    imageCount: images.length,
    missingAltCount,
    wordCount,
  };
}