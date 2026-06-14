import { ByteSize } from '../../classes';

export function byteSizeFormat(value: string | number): boolean {
  return ByteSize.isValid(value);
}
