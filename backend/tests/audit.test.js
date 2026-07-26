import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import request from 'supertest';
import app from '../../backend/src/app.js';

function mockResponse(html, { status = 200, contentType = 'text/html; charset=utf-8' } = {}) {
  const bytes = new TextEncoder().encode(html);
  let done = false;
  const body = new ReadableStream({
    pull(controller) {
      if (!done) { controller.enqueue(bytes); done = true; }
      else { controller.close(); }
    },
  });
  return {
    ok: status >= 200 && status < 300,
    status,
    url: 'https://example.com',
    headers: new Headers({ 'content-type': contentType, 'content-length': String(bytes.byteLength) }),
    body,
  };
}

const SAMPLE_HTML = `<html><head><title>Example</title></head><body><h1>Hi</h1><p>Some words for counting here.</p></body></html>`;

describe('POST /audit', () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => vi.unstubAllGlobals());

  it('happy path: returns a full report for a valid HTML page', async () => {
    fetchMock.mockResolvedValue(mockResponse(SAMPLE_HTML));

    const res = await request(app).post('/audit').send({ url: 'https://example.com' }).expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.report.pageTitle).toBe('Example');
    expect(res.body.report.h1Count).toBe(1);
  });

  it('invalid URL: returns 400 without ever calling fetch', async () => {
    const res = await request(app).post('/audit').send({ url: 'not a url' }).expect(400);

    expect(res.body.error.code).toBe('INVALID_URL');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('non-HTML response: returns 422', async () => {
    fetchMock.mockResolvedValue(mockResponse('{"a":1}', { contentType: 'application/json' }));

    const res = await request(app).post('/audit').send({ url: 'https://api.example.com' }).expect(422);

    expect(res.body.error.code).toBe('NOT_HTML');
  });
});