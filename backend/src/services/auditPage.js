import { fetchPage } from './fetchPage.js';
import { parseHtml } from '../utils/parseHtml.js';

export async function auditPage(url) {
  const page = await fetchPage(url);

  const report = parseHtml(page.html);

  return {
    url: page.finalUrl,
    httpStatus: page.status,
    responseTimeMs: page.responseTimeMs,
    ...report,
  };
}