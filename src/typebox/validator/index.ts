import './formats';
import './schemas';

import type { Static, TSchema } from '@sinclair/typebox';
import { TypeGuard } from '@sinclair/typebox';
import type { TypeCheck } from '@sinclair/typebox/compiler';
import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Value } from '@sinclair/typebox/value';

import type { TypeboxSchema, TypeboxValidationOptions } from '../types';
import { TypeboxValidationError } from '../types';

const defaultOptions: TypeboxValidationOptions = {
  clean: true,
  convert: false,
  decode: false,
  defaults: true,
  encode: false,
};

export class TypeboxValidator<T extends TSchema> {
  private readonly checker: TypeCheck<TSchema>;
  private readonly options: TypeboxValidationOptions;

  constructor(
    private readonly schema: T,
    options?: TypeboxValidationOptions,
  ) {
    if (!TypeGuard.IsSchema(schema)) {
      throw new TypeError('Invalid schema provided');
    }

    this.checker = TypeCompiler.Compile(this.schema);
    this.options = { ...defaultOptions, ...options };
  }

  /**
   * Проводит валидацию с модификацией значения
   * ! мутирует входящее значение value
   */
  public compile(value: unknown): Static<T> {
    try {
      // не используется Value.Parse для лучшего контроля
      // шагов и отличного от базового порядка операций

      if (this.options.clean) {
        value = Value.Clean(this.schema, value);
      }

      if (this.options.defaults) {
        value = Value.Default(this.schema, value);
      }

      if (this.options.convert) {
        value = Value.Convert(this.schema, value);
      }

      if (this.options.encode) {
        value = Value.Encode(this.schema, value);
      }

      if (!this.checker.Check(value)) {
        const errors = [...this.checker.Errors(value)];

        throw new TypeboxValidationError(errors);
      }

      if (this.options.decode) {
        value = Value.Decode(this.schema, value);
      }

      return value;
    } catch (error) {
      if (error instanceof TypeboxValidationError) {
        throw error;
      }

      throw new TypeboxValidationError([], [{ message: error.message }]);
    }
  }
}

export function createValidator<Schema extends TypeboxSchema>(
  schema: Schema,
  options?: TypeboxValidationOptions,
): TypeboxValidator<Schema> {
  return new TypeboxValidator<Schema>(schema, options);
}
