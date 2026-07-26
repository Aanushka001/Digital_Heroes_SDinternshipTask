import { config } from '../config/index.js';
import {
  DnsFailureError,
  NotHtmlError,
  RedirectLoopError,
  ResponseTooLargeError,
  TimeoutError,
} from '../utils/errors.js';

export async function fetchPage(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.fetchTimeoutMs);

  const startTime = Date.now();

  let response;

  try {
    response = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent':
          'PagePulse/1.0 (URL Auditor; +https://github.com/your-handle/page-pulse)',
        Accept: 'text/html,application/xhtml+xml',
      },
    });
  } catch (err) {
    clearTimeout(timer);

    if (err.name === 'AbortError') {
      throw new TimeoutError(config.fetchTimeoutMs);
    }

    const detail = err.cause?.message || err.message || '';
    const code = err.cause?.code || '';

    if (
      code === 'ENOTFOUND' ||
      detail.includes('ENOTFOUND') ||
      detail.includes('getaddrinfo')
    ) {
      throw new DnsFailureError(extractHost(url));
    }

    if (detail.toLowerCase().includes('redirect')) {
      throw new RedirectLoopError();
    }

    throw new DnsFailureError(extractHost(url));
  } finally {
    clearTimeout(timer);
  }

  const responseTimeMs = Date.now() - startTime;

  const contentType = response.headers.get('content-type') || '';

  if (
    !contentType.includes('text/html') &&
    !contentType.includes('application/xhtml')
  ) {
    throw new NotHtmlError(contentType.split(';')[0].trim());
  }

  const contentLength = parseInt(
    response.headers.get('content-length') || '0',
    10
  );

  if (contentLength > config.maxResponseBytes) {
    throw new ResponseTooLargeError();
  }

  const html = await readBodyWithLimit(response, config.maxResponseBytes);

  return {
    html,
    status: response.status,
    responseTimeMs,
    finalUrl: response.url || url,
  };
}

async function readBodyWithLimit(response, maxBytes) {
  const reader = response.body.getReader();
  const chunks = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    totalBytes += value.byteLength;

    if (totalBytes > maxBytes) {
      await reader.cancel();
      throw new ResponseTooLargeError();
    }

    chunks.push(value);
  }

  const combined = new Uint8Array(totalBytes);
  let offset = 0;

  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(combined);
}

function extractHost(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}