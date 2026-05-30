import { CoreError } from './core';

export type ValidationDetail = {
  message: string;
  path?: string;
  value?: unknown;
};

/**
 * Класс-прародитель ошибок валидации
 */
export class ValidationError extends CoreError<ValidationDetail[]> {
  public readonly code = 'VALIDATION_ERROR';
  public readonly statusCode = 400;

  constructor(message?: string, details?: ValidationDetail[]) {
    super(message || 'Validation Error', details);
  }
}
