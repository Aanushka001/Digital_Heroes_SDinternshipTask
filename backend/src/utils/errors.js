/**
 * Base class for every error Page Pulse deliberately throws.
 * Carries an HTTP status code and a machine-readable code the frontend can switch on.
 */
export class AuditError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class InvalidUrlError extends AuditError {
  constructor(detail = 'Please provide a valid http:// or https:// URL.') {
    super(detail, 400, 'INVALID_URL');
  }
}

export class DnsFailureError extends AuditError {
  constructor(host) {
    super(`Could not reach "${host}". The domain may not exist or is unreachable.`, 502, 'DNS_FAILURE');
  }
}

export class TimeoutError extends AuditError {
  constructor(timeoutMs) {
    super(`The target URL did not respond within ${timeoutMs / 1000} seconds.`, 504, 'TIMEOUT');
  }
}

export class NotHtmlError extends AuditError {
  constructor(contentType) {
    super(`The URL returned "${contentType}", which is not an HTML page.`, 422, 'NOT_HTML');
  }
}

export class RedirectLoopError extends AuditError {
  constructor() {
    super('Too many redirects — this URL appears to loop.', 508, 'REDIRECT_LOOP');
  }
}

export class ResponseTooLargeError extends AuditError {
  constructor() {
    super('The page response was too large to audit.', 413, 'RESPONSE_TOO_LARGE');
  }
}