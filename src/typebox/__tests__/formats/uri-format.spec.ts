import { Type } from '@sinclair/typebox';
import { describe, it, expect } from 'vitest';

import { TypeboxValidator } from '../../validator';

import { TFormats } from '../../types';

const uriValidator = new TypeboxValidator(
  Type.String({ format: TFormats.Uri }),
);

describe('Typebox', () => {
  describe('TFormats.Uri', () => {
    describe('valid URI addresses', () => {
      it.each([
        'http://example.com',
        'https://example.com',
        'ftp://example.com',
        'mailto:user@example.com',
        'tel:+1234567890',
        'file:///path/to/file',
        'ldap://[2001:db8::7]/c=GB?objectClass?one',
        'news:comp.infosystems.www.servers.unix',
        'urn:oasis:names:specification:docbook:dtd:xml:4.1.2',
        'http://example.com:8080/path?query=value#fragment',
        'https://user:pass@example.com/path',
        'ftp://user@ftp.example.com/dir/file.txt',
        'scheme://authority/path?query#fragment',
        'http://127.0.0.1:8000',
        'https://localhost:3000',
        'http://10.0.0.1',
        'http://168.0.1.1',
        'custom-scheme://example.com',
        'a://b',
        'x://y/z',
        'scheme+extension://example.com',
        'scheme.extension://example.com',
        'scheme-extension://example.com',
        'http://[::1]:8080',
        'http://[2001:db8::1]',
        'ldap://[2001:db8::7]:389/c=GB?objectClass?one',
        'ws://example.com/path/to/resource',
      ])('should validate "%s" as valid URI', (uri) => {
        expect(() => uriValidator.compile(uri)).not.toThrow();
      });
    });

    describe('invalid URI addresses', () => {
      it.each([
        'not-a-uri',
        'no-scheme',
        '://no-scheme',
        'scheme',
        'scheme:',
        ' http://example.com',
        'http://example.com ',
        'http:// example.com',
        'http://ex ample.com',
        '',
        ' ',
        '1scheme://example.com', // scheme can't start with digit
        '-scheme://example.com', // scheme can't start with dash
        '.scheme://example.com', // scheme can't start with dot
        'scheme with spaces://example.com',
        'scheme[bracket]://example.com',
      ])('should reject "%s" as invalid URI', (uri) => {
        expect(() => uriValidator.compile(uri)).toThrow();
      });
    });

    describe('edge cases', () => {
      it('should handle URI with empty authority', () => {
        expect(() => uriValidator.compile('file:///path')).not.toThrow();
      });

      it('should handle URI with IPv6 address', () => {
        expect(() => uriValidator.compile('http://[::1]/')).not.toThrow();
      });

      it('should handle URI with percent-encoded characters', () => {
        expect(() =>
          uriValidator.compile('http://example.com/path%20with%20spaces'),
        ).not.toThrow();
      });

      it('should handle very long URI', () => {
        const maxPathLength = 1000;
        const longPath = 'a'.repeat(maxPathLength);
        expect(() =>
          uriValidator.compile(`http://example.com/${longPath}`),
        ).not.toThrow();
      });
    });
  });
});
