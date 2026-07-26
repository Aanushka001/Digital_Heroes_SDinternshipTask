import { fetchPage } from './fetchPage.js';
import { parseHtml } from '../utils/parseHtml.js';

export async function auditPage(url) {
  const page = await fetchPage(url);
  const parsed = parseHtml(page.html);

  return {
    url: page.finalUrl,
    auditedAt: new Date().toISOString(),
    httpStatus: page.status,
    responseTimeMs: page.responseTimeMs,
    pageTitle: parsed.title,
    metaDescription: parsed.metaDescription,
    h1Count: parsed.h1Count,
    imagesMissingAlt: parsed.missingAltCount,
    wordCount: parsed.wordCount,
  };
}