export async function checkRobots(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);

  try {
    const robotsUrl = new URL('/robots.txt', url).toString();

    const response = await fetch(robotsUrl, {
      signal: controller.signal,
      headers: { 'User-Agent': 'PagePulse/1.0' },
    });

    if (!response.ok) {
      return { exists: false, status: 'warning', message: 'robots.txt not found.' };
    }

    return { exists: true, status: 'good', message: 'robots.txt found.' };
  } catch {
    return { exists: false, status: 'warning', message: 'Unable to check robots.txt.' };
  } finally {
    clearTimeout(timer);
  }
}