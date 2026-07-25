export async function checkFavicon(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);

  try {
    const faviconUrl = new URL('/favicon.ico', url).toString();

    const response = await fetch(faviconUrl, {
      method: 'HEAD',
      signal: controller.signal,
      headers: { 'User-Agent': 'PagePulse/1.0' },
    });

    if (!response.ok) {
      return { exists: false, status: 'warning', message: 'Favicon not found.' };
    }

    return { exists: true, status: 'good', message: 'Favicon found.' };
  } catch {
    return { exists: false, status: 'warning', message: 'Unable to check favicon.' };
  } finally {
    clearTimeout(timer);
  }
}