/* eslint-disable @typescript-eslint/naming-convention */

import { Type as OriginalType } from '@sinclair/typebox';

import { TByteSize, TTimestamp } from './schemas';

// Реэкспорт из исходного пакета
export * from '@sinclair/typebox';
export { TypeCompiler } from '@sinclair/typebox/compiler';
export { Value } from '@sinclair/typebox/value';

export * from './schemas';
export * from './validator';
export * from './types';

type ExtendedType = typeof OriginalType & {
  ByteSize: typeof TByteSize;
  Timestamp: typeof TTimestamp;
};

/* prettier-ignore */
export const Type = Object.assign(
  Object.create(OriginalType),
  {
    ByteSize: TByteSize,
    Timestamp: TTimestamp,
  },
) as ExtendedType;
