import { FormatRegistry } from '@sinclair/typebox';

import { dateFormat, dateTimeFormat, timeFormat } from './datetime';
import { emailFormat } from './email';
import { ipv4Format, ipv6Format } from './ip';
import { uriFormat, urlFormat } from './url';
import { uuidFormat } from './uuid';

import { TypeboxFormats } from '../../types';

FormatRegistry.Set(TypeboxFormats.Email, emailFormat);
FormatRegistry.Set(TypeboxFormats.Uuid, uuidFormat);
FormatRegistry.Set(TypeboxFormats.Url, urlFormat);
FormatRegistry.Set(TypeboxFormats.Uri, uriFormat);
FormatRegistry.Set(TypeboxFormats.Ipv4, ipv4Format);
FormatRegistry.Set(TypeboxFormats.Ipv6, ipv6Format);
FormatRegistry.Set(TypeboxFormats.Date, dateFormat);
FormatRegistry.Set(TypeboxFormats.Time, timeFormat);
FormatRegistry.Set(TypeboxFormats.DateTime, dateTimeFormat);
