import { describe, it, expect } from 'vitest';
import { parseHtml } from '../../backend/src/utils/parseHtml.js';

describe('parseHtml', () => {
  it('happy path: extracts all fields from a normal page', () => {
    const html = `
      <html>
        <head>
          <title>Example Domain</title>
          <meta name="description" content="A test page for Page Pulse.">
        </head>
        <body>
          <h1>Welcome</h1>
          <p>This page has some words in it for testing.</p>
          <img src="logo.png" alt="Company logo">
          <img src="banner.jpg">
        </body>
      </html>
    `;
    const result = parseHtml(html);

    expect(result.title).toBe('Example Domain');
    expect(result.metaDescription).toBe('A test page for Page Pulse.');
    expect(result.h1Count).toBe(1);
    expect(result.missingAltCount).toBe(1);
    expect(result.wordCount).toBeGreaterThan(0);
  });

  it('failure case: missing title and meta description return empty strings, not a crash', () => {
    const html = `<html><body><h1>No head tags here</h1></body></html>`;
    const result = parseHtml(html);

    expect(result.title).toBe('');
    expect(result.metaDescription).toBe('');
    expect(result.h1Count).toBe(1);
  });

  it('failure case: empty body returns zero counts, not a crash', () => {
    const html = `<html><head></head><body></body></html>`;
    const result = parseHtml(html);

    expect(result.wordCount).toBe(0);
    expect(result.h1Count).toBe(0);
    expect(result.missingAltCount).toBe(0);
  });

  it('edge case: counts multiple images missing alt text correctly', () => {
    const html = `
      <html><body>
        <img src="a.jpg">
        <img src="b.jpg" alt="">
        <img src="c.jpg" alt="Has alt text">
        <img src="d.jpg">
      </body></html>
    `;
    const result = parseHtml(html);
    expect(result.missingAltCount).toBe(3); // a, b (empty), d
  });
});