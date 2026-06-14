/* eslint-disable @typescript-eslint/naming-convention */

import {
  TString,
  TTransform,
  Type,
  TNumber,
  TUnion,
  SchemaOptions,
} from '@sinclair/typebox';

import { Timestamp } from '../../classes';

import { TFormats } from '../types';

export type TTimestamp = TTransform<TUnion<[TString, TNumber]>, Timestamp>;

export function TTimestamp(options?: SchemaOptions): TTimestamp {
  const inputSchema = Type.Union([
    Type.String({ format: TFormats.ByteSize }),
    Type.Number({ minimum: 0 }),
  ]);

  const schema = Type.Transform(inputSchema)
    .Decode((value) => new Timestamp(value))
    .Encode((value) => value.toString());

  return Object.assign(schema, options);
}
