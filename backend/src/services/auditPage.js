import { fetchPage } from './fetchPage.js';
import { parseHtml } from '../utils/parseHtml.js';
import { analyzeSeo } from '../utils/analyzeSeo.js';
import { calculateScore } from '../utils/calculateScore.js';

export async function auditPage(url) {
  const page = await fetchPage(url);

  const parsed = parseHtml(page.html);
  const analysis = analyzeSeo(parsed);
  const summary = calculateScore(analysis);

  return {
    url: page.finalUrl,
    httpStatus: page.status,
    responseTimeMs: page.responseTimeMs,

    parsed,
    analysis,
    summary,
  };
}