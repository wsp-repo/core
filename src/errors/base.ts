import { CoreError } from './core';

export class BadRequestError extends CoreError {
  public readonly code = 'BAD_REQUEST_ERROR';
  public readonly statusCode = 400;

  constructor(message?: string, details?: unknown) {
    super(message || 'Bad Request Error', details);
  }
}

export class ConflictError extends CoreError {
  public readonly code = 'CONFLICT_ERROR';
  public readonly statusCode = 409;

  constructor(message?: string, details?: unknown) {
    super(message || 'Conflict Error', details);
  }
}

export class UnauthorizedError extends CoreError {
  public readonly code = 'UNAUTHORIZED_ERROR';
  public readonly statusCode = 401;

  constructor(message?: string, details?: unknown) {
    super(message || 'Unauthorized Error', details);
  }
}

export class ForbiddenError extends CoreError {
  public readonly code = 'FORBIDDEN_ERROR';
  public readonly statusCode = 403;

  constructor(message?: string, details?: unknown) {
    super(message || 'Forbidden Error', details);
  }
}

export class NotFoundError extends CoreError {
  public readonly code = 'NOT_FOUND_ERROR';
  public readonly statusCode = 404;

  constructor(message?: string, details?: unknown) {
    super(message || 'Not Found Error', details);
  }
}

export class ServiceError extends CoreError {
  public readonly code = 'SERVICE_ERROR';
  public readonly statusCode = 500;

  constructor(message?: string, details?: unknown) {
    super(message || 'Service Error', details);
  }
}
