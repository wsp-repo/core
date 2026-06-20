import { Type } from '@sinclair/typebox';
import { describe, it, expect } from 'vitest';

import { TypeboxValidator } from '../../validator';

import { TFormats } from '../../types';

const ipv6Validator = new TypeboxValidator(
  Type.String({ format: TFormats.Ipv6 }),
);

describe('Typebox', () => {
  describe('TFormats.Ipv6', () => {
    describe('valid IPv6 addresses', () => {
      it.each([
        '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        '2001:db8:85a3:0:0:8a2e:370:7334',
        '2001:0db8:85a3::8a2e:0370:7334',
        '::1',
        '::',
        '2001:db8::1',
        '2001:0db8::0001',
        '2001:db8:85a3::8a2e:370:7334',
        '2001:db8::',
        '::2001:db8',
        '2001::1',
        '::ffff:192.0.2.1',
        '::ffff:0:192.0.2.1',
        '2001:db8:85a3:8d3:1319:8a2e:370:7348',
        '2001:DB8::1',
        'FE80::1',
        'FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF',
        'fe80:0000:0000:0000:0202:b3ff:fe1e:8329',
        'fe80::202:b3ff:fe1e:8329',
        '2001:0db8:0000:0042:0000:8a2e:0370:7334',
        'ff02::1',
        'ff02::2',
        'fe80::',
        'fc00::',
        'fd00::',
        '2001:db8:0:0:1:0:0:1',
        '2001:0db8:0000:0000:0001:0000:0000:0001',
        'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
        '0000:0000:0000:0000:0000:0000:0000:0000',
        '0:0:0:0:0:0:0:0',
        '0:0:0:0:0:0:0:1',
        '2001:db8:85a3:0:0:8a2e:370:7334',
        '2001:db8:a0b:12f0::1',
      ])('should validate IPv6 address: %s', (ipv6) => {
        expect(() => ipv6Validator.compile(ipv6)).not.toThrow();
        expect(ipv6Validator.compile(ipv6)).toBe(ipv6);
      });
    });

    describe('invalid IPv6 addresses', () => {
      it.each([
        'gggg::1',
        '2001:0db8:85a3::8a2e:037g:7334',
        '2001:zzzz::1',
        '2001:0db8:85a3:0000:0000:8a2e:0370:7334:1234',
        '1:2:3:4:5:6:7:8:9',
        '2001:0db8:85a3:0000:0000:8a2e:0370',
        '2001:0db8:85a3:0000:0000:8a2e',
        '2001::db8::1',
        '::2001::db8',
        '2001:db8:::1',
        '20001:db8::1',
        '2001:0db8g:85a3::1',
        '2001:12345:85a3::1',
        ':2001:db8::1',
        '2001:db8::1:',
        '2001:db8:.1',
        '2001:db8: :1',
        '',
        'not-an-ipv6',
        '192.168.1.1',
        '::ffff:256.1.1.1',
        '::ffff:192.168.1',
        '::ffff:192.168.1.1.1',
        '2001:0db8:85a3:0000:0000:8a2e:0370:7334:',
        ':2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        '2001-0db8-85a3-0000-0000-8a2e-0370-7334',
        '2001.0db8.85a3.0000.0000.8a2e.0370.7334',
        '2001:::',
        ':::1',
        '1:::',
        '2001:0gb8::1',
        '2001:0db8:85h3::1',
        '2001:0db8:85a3:0000:0000:8a2e:0370:7334:1111:2222',
      ])('should reject IPv6 address: %s', (ipv6) => {
        expect(() => ipv6Validator.compile(ipv6)).toThrow();
      });
    });
  });
});
