import { Type } from '@sinclair/typebox';
import { describe, it, expect } from 'vitest';

import { TypeboxValidator } from '../../validator';

import { TFormats } from '../../types';

describe('Typebox - проверка формата [TFormats.Url]', () => {
  const urlValidator = new TypeboxValidator(
    Type.String({ format: TFormats.Url }),
  );

  describe('valid URL addresses', () => {
    it.each([
      'http://example.com',
      'https://example.com',
      'ftp://example.com',
      'http://www.example.com',
      'https://www.example.com',
      'ftp://www.example.com',
      'http://example.org',
      'https://example.net',
      'ftp://files.example.com',
      'http://subdomain.example.com',
      'https://sub.domain.example.com',
      'http://example.com:8080',
      'https://example.com:443',
      'ftp://example.com:21',
      'http://example.com/',
      'https://example.com/',
      'ftp://example.com/',
      'http://example.com/path',
      'https://example.com/path/to/resource',
      'ftp://example.com/files/document.txt',
      'http://example.com/path?query=value',
      'https://example.com/path?query=value&param=123',
      'http://example.com/path#fragment',
      'https://example.com/path?query=value#fragment',
      'http://example.com/path/with-dashes',
      'https://example.com/path_with_underscores',
      'http://example.com/path.with.dots',
      'https://user@example.com',
      'http://user:pass@example.com',
      'ftp://user:pass@ftp.example.com',
      'http://my-site.co.uk',
      'https://site123.museum',
      'http://test.travel',
      'https://domain.info',
    ])('should validate "%s" as valid URL', (url) => {
      expect(() => urlValidator.compile(url)).not.toThrow();
    });
  });

  describe('invalid URL addresses', () => {
    it.each([
      // Неправильные протоколы
      'file://example.com',
      'javascript:alert(1)',
      'data:text/plain,hello',
      'ssh://example.com',

      // Отсутствие протокола
      'example.com',
      'www.example.com',
      '//example.com',

      // Неполные URL
      'http://',
      'https://',
      'ftp://',
      'http://.',
      'https://.',
      'ftp://.',
      'http://..',
      'https://..',
      'ftp://..',

      // Пробелы в URL
      'http:// example.com',
      'https:// example.com',
      'ftp:// example.com',
      'http://ex ample.com',
      'https://ex ample.com',

      // Неправильные протоколы
      'htp://example.com',
      'htps://example.com',
      'httpss://example.com',
      'ftps://example.com',

      // Пустые строки
      '',
      ' ',

      // Только текст
      'not-a-url',

      // Домены без TLD
      'http://example',
      'https://localhost',
      'ftp://domain',
    ])('should reject "%s" as invalid URL', (url) => {
      expect(() => urlValidator.compile(url)).toThrow();
    });
  });
});
