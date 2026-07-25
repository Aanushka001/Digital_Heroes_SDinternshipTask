
import { fetchPage } from './fetchPage.js';
import { parseHtml } from '../utils/parseHtml.js';
import { analyzeSeo } from '../utils/analyzeSeo.js';
import { calculateScore } from '../utils/calculateScore.js';
import { checkRobots } from '../utils/checkRobots.js';
import { checkFavicon } from '../utils/checkFavicon.js';
import { checkSitemap } from '../utils/checkSitemap.js';
import { checkOpenGraph } from '../utils/checkOpenGraph.js';
import { checkTwitterCard } from '../utils/checkTwitterCard.js';
import { checkCanonical } from '../utils/checkCanonical.js';
import { checkStructuredData } from '../utils/checkStructuredData.js';
import { checkPerformance } from "../utils/checkPerformance.js";

export async function auditPage(url) {
  const page = await fetchPage(url);

  const parsed = parseHtml(page.html);
  const analysis = analyzeSeo(parsed);
  const summary = calculateScore(analysis);

  const robots = await checkRobots(page.finalUrl);
  const favicon = await checkFavicon(page.finalUrl);
  const sitemap = await checkSitemap(page.finalUrl);

  const openGraph = checkOpenGraph(page.html);
  const twitterCard = checkTwitterCard(page.html);
  const canonical = checkCanonical(page.html);
  const structuredData = checkStructuredData(page.html);
  const performance = checkPerformance(page);

  return {
    auditedAt: new Date().toISOString(),
    apiVersion: "1.0.0",
    url: page.finalUrl,
    httpStatus: page.status,
    responseTimeMs: page.responseTimeMs,

    parsed,
    analysis,
    summary,

    robots,
    favicon,
    sitemap,
    openGraph,
    twitterCard,
    canonical,
    structuredData,
    performance,
  };
}