import { ByteSize } from 'src/classes';

export function byteSizeFormat(value: string | number): boolean {
  return ByteSize.isValid(value);
}
