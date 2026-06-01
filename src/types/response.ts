import { CoreError } from '../errors';

export type SuccessResponse<Result = never> = [Result] extends [never]
  ? { result?: never; success: true }
  : { result: Result; success: true };

export type ErrorResponse<ErrorType extends CoreError = CoreError> = {
  error: ErrorType;
  success: false;
};

export type ApiResponse<Result = never> =
  | SuccessResponse<Result>
  | ErrorResponse;
