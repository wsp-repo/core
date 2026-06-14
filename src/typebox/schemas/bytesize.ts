/* eslint-disable @typescript-eslint/naming-convention */

import {
  TNumber,
  TString,
  TTransform,
  Type,
  TUnion,
  SchemaOptions,
} from '@sinclair/typebox';

import { ByteSize } from '../../classes';

import { TFormats } from '../types';

export type TByteSize = TTransform<TUnion<[TString, TNumber]>, ByteSize>;

export function TByteSize(options?: SchemaOptions): TByteSize {
  const inputSchema = Type.Union([
    Type.String({ format: TFormats.ByteSize }),
    Type.Number({ minimum: 0 }),
  ]);

  const schema = Type.Transform(inputSchema)
    .Decode((value) => new ByteSize(value))
    .Encode((value) => value.toString());

  return Object.assign(schema, options);
}
