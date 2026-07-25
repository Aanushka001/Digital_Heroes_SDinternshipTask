export function checkPerformance(page) {
  const sizeBytes = Buffer.byteLength(page.html, "utf8");

  const sizeKB = Number((sizeBytes / 1024).toFixed(2));

  return {
    responseTimeMs: page.responseTimeMs,

    pageSize: {
      bytes: sizeBytes,
      kb: sizeKB,
      status:
        sizeKB < 500
          ? "good"
          : sizeKB < 1500
          ? "warning"
          : "error",
      message:
        sizeKB < 500
          ? "Page size is good."
          : sizeKB < 1500
          ? "Page is moderately large."
          : "Page is very large.",
    },

    speed: {
      value: page.responseTimeMs,
      status:
        page.responseTimeMs < 1000
          ? "good"
          : page.responseTimeMs < 3000
          ? "warning"
          : "error",
      message:
        page.responseTimeMs < 1000
          ? "Fast response."
          : page.responseTimeMs < 3000
          ? "Average response."
          : "Slow response.",
    },
  };
}