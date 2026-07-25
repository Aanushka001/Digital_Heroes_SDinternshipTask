export async function checkFavicon(url) {
  try {
    const faviconUrl = new URL('/favicon.ico', url).toString();

    const response = await fetch(faviconUrl, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'PagePulse/1.0',
      },
    });

    if (!response.ok) {
      return {
        exists: false,
        status: 'warning',
        message: 'Favicon not found.',
      };
    }

    return {
      exists: true,
      status: 'good',
      message: 'Favicon found.',
    };
  } catch {
    return {
      exists: false,
      status: 'warning',
      message: 'Unable to check favicon.',
    };
  }
}