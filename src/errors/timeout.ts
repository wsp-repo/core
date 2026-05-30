import { CoreError } from './core';

export class TimeoutError extends CoreError {
  public readonly code = 'TIMEOUT_ERROR';
  public readonly statusCode = 500;

  constructor(message?: string, details?: unknown) {
    super(message || 'Timeout Error', details);
  }
}
