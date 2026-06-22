export type CoreErrorJson<TDetails = unknown> = {
  code: string;
  details?: TDetails;
  message: string;
  name: string;
  stack?: string;
  statusCode: number;
};

export class CoreError<TDetails = unknown> extends Error {
  public readonly code: string = 'UNKNOWN_ERROR';
  public readonly statusCode: number = 500;

  constructor(
    public readonly message = 'System error',
    public readonly details?: TDetails,
  ) {
    super(message);
  }

  /**
   * Формирует корректное тело JSON объекта
   */
  public toJSON(): CoreErrorJson<TDetails> {
    return {
      code: this.code,
      details: this.details,
      message: this.message,
      name: this.name,
      stack: this.stack,
      statusCode: this.statusCode,
    };
  }
}
