const API_URL = import.meta.env.VITE_API_URL;

export async function auditUrl(url) {
  const response = await fetch(`${API_URL}/audit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  const body = await response.json();

  if (!body.success) {
    const error = new Error(body.error?.message || 'Something went wrong.');
    error.code = body.error?.code;
    throw error;
  }

  return body.report;
}