import { Timestamp } from 'src/classes';

export function timestampFormat(value: string | number): boolean {
  return Timestamp.isValid(value);
}
