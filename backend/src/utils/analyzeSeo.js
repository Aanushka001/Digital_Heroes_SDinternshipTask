export function analyzeSeo(report) {
  return {
    title: analyzeTitle(report.title),
    metaDescription: analyzeMetaDescription(report.metaDescription),
    h1: analyzeH1(report.h1Count),
    images: analyzeImages(
      report.imageCount,
      report.missingAltCount
    ),
    wordCount: analyzeWordCount(report.wordCount),
  };
}

function analyzeTitle(title) {
  const length = title.trim().length;

  if (length === 0) {
    return {
      value: title,
      status: 'error',
      message: 'Missing page title.',
    };
  }

  if (length < 30) {
    return {
      value: title,
      status: 'warning',
      message: 'Title is shorter than the recommended 30 characters.',
    };
  }

  if (length > 60) {
    return {
      value: title,
      status: 'warning',
      message: 'Title is longer than the recommended 60 characters.',
    };
  }

  return {
    value: title,
    status: 'good',
    message: 'Title length looks good.',
  };
}

function analyzeMetaDescription(description) {
  const length = description.trim().length;

  if (length === 0) {
    return {
      value: description,
      status: 'error',
      message: 'Missing meta description.',
    };
  }

  if (length < 120) {
    return {
      value: description,
      status: 'warning',
      message: 'Meta description is shorter than recommended.',
    };
  }

  if (length > 160) {
    return {
      value: description,
      status: 'warning',
      message: 'Meta description is longer than recommended.',
    };
  }

  return {
    value: description,
    status: 'good',
    message: 'Meta description length looks good.',
  };
}

function analyzeH1(count) {
  if (count === 0) {
    return {
      count,
      status: 'error',
      message: 'No H1 heading found.',
    };
  }

  if (count > 1) {
    return {
      count,
      status: 'warning',
      message: 'Multiple H1 headings found.',
    };
  }

  return {
    count,
    status: 'good',
    message: 'Exactly one H1 heading found.',
  };
}

function analyzeImages(total, missingAlt) {
  if (total === 0) {
    return {
      total,
      missingAlt,
      status: 'good',
      message: 'No images found.',
    };
  }

  if (missingAlt > 0) {
    return {
      total,
      missingAlt,
      status: 'warning',
      message: `${missingAlt} image(s) are missing alt text.`,
    };
  }

  return {
    total,
    missingAlt,
    status: 'good',
    message: 'All images have alt text.',
  };
}

function analyzeWordCount(words) {
  if (words < 300) {
    return {
      value: words,
      status: 'warning',
      message: 'Content is shorter than 300 words.',
    };
  }

  return {
    value: words,
    status: 'good',
    message: 'Content length looks good.',
  };
}