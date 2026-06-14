import { CoreError } from '../errors';

export type SuccessResponse<TResult = never> = [TResult] extends [never]
  ? { result?: never; success: true }
  : { result: TResult; success: true };

export type ErrorResponse = {
  error: CoreError;
  success: false;
};
