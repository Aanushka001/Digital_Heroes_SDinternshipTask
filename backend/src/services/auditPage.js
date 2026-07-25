import { fetchPage } from './fetchPage.js';
import { parseHtml } from '../utils/parseHtml.js';
import { analyzeSeo } from '../utils/analyzeSeo.js';
import { calculateScore } from '../utils/calculateScore.js';
import { checkRobots } from '../utils/checkRobots.js';
import { checkFavicon } from '../utils/checkFavicon.js';
import { checkSitemap } from '../utils/checkSitemap.js';
export async function auditPage(url) {
  const page = await fetchPage(url);

  const parsed = parseHtml(page.html);
  const analysis = analyzeSeo(parsed);
  const summary = calculateScore(analysis);
  const robots = await checkRobots(page.finalUrl);
  const favicon = await checkFavicon(page.finalUrl);
  const sitemap = await checkSitemap(page.finalUrl);
  return {
    url: page.finalUrl,
    httpStatus: page.status,
    responseTimeMs: page.responseTimeMs,

    parsed,
    analysis,
    summary,
    robots,
    favicon,
    sitemap,
  };
}