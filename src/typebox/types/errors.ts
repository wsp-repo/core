import { ValueError, ValueErrorType } from '@sinclair/typebox/errors';

import { ValidationDetail, ValidationError } from '../../errors';

export class TypeboxError extends ValidationError {
  constructor(
    public readonly errors: ValueError[] = [],
    details?: ValidationDetail[],
  ) {
    const message =
      errors.length === 0 ? 'Неизвестная ошибка валидации' : 'Ошибка валидации';

    let setDetails: ValidationDetail[] = [];

    if (errors.length === 0) {
      setDetails = details || [{ message }];
    } else {
      const unionPaths: string[] = [];

      for (const error of errors) {
        // устранение дубликатов ошибок для Union типов
        if (unionPaths.some((path) => error.path.includes(path))) {
          continue;
        }

        if (error.type === ValueErrorType.Union) {
          unionPaths.push(error.path);
        }

        setDetails.push({
          message: error.message,
          path: error.path,
          value: error.value,
        });
      }
    }

    super(message, setDetails);
  }
}
