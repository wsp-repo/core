import './extRegistry'; // регистрация расширений

import type { Static, TSchema } from '@sinclair/typebox';
import { TypeGuard } from '@sinclair/typebox';
import type { TypeCheck } from '@sinclair/typebox/compiler';
import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Value } from '@sinclair/typebox/value';

import type { TypeboxOptions } from '../types';
import { TypeboxError } from '../types';

const defaultOptions: TypeboxOptions = {
  clean: true,
  convert: false,
  decode: false,
  defaults: true,
  encode: false,
};

export class TypeboxValidator<T extends TSchema> {
  private readonly checker: TypeCheck<TSchema>;
  private readonly options: TypeboxOptions;

  constructor(
    private readonly schema: T,
    options?: TypeboxOptions,
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

        throw new TypeboxError(errors);
      }

      if (this.options.decode) {
        value = Value.Decode(this.schema, value);
      }

      return value;
    } catch (error) {
      if (error instanceof TypeboxError) {
        throw error;
      }

      throw new TypeboxError([], [{ message: error.message }]);
    }
  }
}

export function createValidator<Schema extends TSchema>(
  schema: Schema,
  options?: TypeboxOptions,
): TypeboxValidator<Schema> {
  return new TypeboxValidator<Schema>(schema, options);
}
