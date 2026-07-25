export async function checkSitemap(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);

  try {
    const sitemapUrl = new URL('/sitemap.xml', url).toString();

    const response = await fetch(sitemapUrl, {
      method: 'HEAD',
      signal: controller.signal,
      headers: { 'User-Agent': 'PagePulse/1.0' },
    });

    if (!response.ok) {
      return { exists: false, status: 'warning', message: 'Sitemap not found.' };
    }

    return { exists: true, status: 'good', message: 'Sitemap found.' };
  } catch {
    return { exists: false, status: 'warning', message: 'Unable to check sitemap.' };
  } finally {
    clearTimeout(timer);
  }
}