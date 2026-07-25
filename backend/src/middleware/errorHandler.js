import { AuditError } from '../utils/errors.js';

export function errorHandler(err, req, res, next) {
  if (err instanceof AuditError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        statusCode: err.statusCode,
      },
    });
  }

  // Anything that isn't one of our typed errors is unexpected.
  // Log it for ourselves, but never leak internals (stack traces, file paths) to the client.
  console.error('Unexpected error:', err);

  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Something went wrong on our end. Please try again.',
      statusCode: 500,
    },
  });
}