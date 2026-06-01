import { ValueError } from '@sinclair/typebox/errors';
import { ValueErrorType } from '@sinclair/typebox/errors';

import { ValidationDetail } from 'src/errors';
import { ValidationError } from 'src/errors';
import { isEmpty } from 'src/helpers';

export class TypeboxError extends ValidationError {
  constructor(
    public readonly errors: ValueError[] = [],
    details?: ValidationDetail[],
  ) {
    const message = isEmpty(errors)
      ? 'Неизвестная ошибка валидации'
      : 'Ошибка валидации';

    let setDetails: ValidationDetail[] = [];

    if (isEmpty(errors)) {
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
