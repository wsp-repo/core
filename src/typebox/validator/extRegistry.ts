import { TypeRegistry, FormatRegistry  } from '@sinclair/typebox';

import {
  dateFormat,
  dateTimeFormat,
  timeFormat,
  emailFormat,
  ipv4Format,
  ipv6Format,
  uriFormat,
  urlFormat,
  uuidFormat,
} from '../formats';
import { TStringEnum, TStringUnion } from '../schemas';

import { TFormats } from '../types';

// регистрация кастомных схем в TypeBox
TypeRegistry.Set(
  'TStringEnum',
  (schema: TStringEnum<Record<string, string>>, value: unknown) => {
    return typeof value === 'string' && schema.enum.includes(value);
  },
);
TypeRegistry.Set(
  'TStringUnion',
  (schema: TStringUnion<readonly string[]>, value: unknown) => {
    return typeof value === 'string' && schema.enum.includes(value);
  },
);

FormatRegistry.Set(TFormats.Email, emailFormat);
FormatRegistry.Set(TFormats.Uuid, uuidFormat);
FormatRegistry.Set(TFormats.Url, urlFormat);
FormatRegistry.Set(TFormats.Uri, uriFormat);
FormatRegistry.Set(TFormats.Ipv4, ipv4Format);
FormatRegistry.Set(TFormats.Ipv6, ipv6Format);
FormatRegistry.Set(TFormats.Date, dateFormat);
FormatRegistry.Set(TFormats.Time, timeFormat);
FormatRegistry.Set(TFormats.DateTime, dateTimeFormat);
