import { InvalidUrlError } from '../utils/errors.js';

export function validateUrl(req, res, next) {
  const { url } = req.body || {};

  if (typeof url !== 'string' || url.trim() === '') {
    return next(
      new InvalidUrlError('A "url" field is required in the request body.')
    );
  }

  const trimmedUrl = url.trim();

  let parsed;

  try {
    parsed = new URL(trimmedUrl);
  } catch {
    return next(new InvalidUrlError(`"${trimmedUrl}" is not a valid URL.`));
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return next(
      new InvalidUrlError(
        `Unsupported protocol "${parsed.protocol}" — only http and https are supported.`
      )
    );
  }

  req.validatedUrl = trimmedUrl;
  next();
}