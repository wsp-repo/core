export class CoreError<DetailsType = unknown> extends Error {
  public readonly code: string = 'UNKNOWN_ERROR';
  public readonly statusCode: number = 500;

  constructor(
    public readonly message = 'System error',
    public readonly details?: DetailsType,
  ) {
    super(message);
  }
}
