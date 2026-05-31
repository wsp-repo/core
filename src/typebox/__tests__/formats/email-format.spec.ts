import { Type } from '@sinclair/typebox';
import { describe, it, expect } from 'vitest';

import { TypeboxValidator } from '../../validator';

import { TFormats } from '../../types';

describe('TypeBox - проверка формата [TFormats.Email]', () => {
  const emailValidator = new TypeboxValidator(
    Type.String({ format: TFormats.Email }),
  );

  describe('valid email addresses', () => {
    it.each([
      'test@example.com',
      'user@domain.org',
      'admin@site.net',
      'contact@company.co.uk',
      'user123@example.com',
      'test@example123.com',
      '123@example.com',
      'first.last@example.com',
      'user.name@domain.com',
      'a.b.c@example.com',
      'user-name@example.com',
      'test@sub-domain.com',
      'user@example-site.org',
      'user_name@example.com',
      'test_user@domain.com',
      'user+tag@example.com',
      'test+filter@domain.org',
      'user+123@example.com',
      'a@example.com',
      'x@domain.org',
      'user@very-long-domain-name.com',
      'test@subdomain.example.com',
      'admin@mail.subdomain.example.org',
      'user@example.info',
      'test@domain.biz',
      'admin@site.travel',
      'contact@company.museum',
      'test@192.168.1.1',
      'verylongusernamethatexceedsthemaximumlengthallowedforlocalpart@example.com',
      'user@example.c',
      'user++@example.com',
      'user--@example.com',
      'user__@example.com',
      '+user@example.com',
      'user+@example.com',
      '-user@example.com',
      'user-@example.com',
      '_user@example.com',
      'user_@example.com',
    ])('should validate email address: %s', (email) => {
      expect(() => emailValidator.compile(email)).not.toThrow();
      expect(emailValidator.compile(email)).toBe(email);
    });
  });

  describe('invalid email addresses', () => {
    it.each([
      'userexample.com',
      'testdomain.org',
      'plainaddress',
      'user@@example.com',
      'test@domain@com',
      'user@domain@example.com',
      '@example.com',
      '@domain.org',
      'user@',
      'test@',
      '',
      '   ',
      'user @example.com',
      'user@ example.com',
      'user @example.com',
      'user name@example.com',
      'user@exam ple.com',
      'user<@example.com',
      'user>@example.com',
      'user[@example.com',
      'user]@example.com',
      'user\\@example.com',
      'user"@example.com',
      'user;@example.com',
      'user:@example.com',
      'user..name@example.com',
      'user@example..com',
      '.user@example.com',
      'user.@example.com',
      'user@.example.com',
      'user@example.com.',
      'user@.',
      'user@.com',
      'user@com.',
      'user@-example.com',
      'user@example-.com',
      'user@domain',
      'test@localhost.',
      'user@example.',
      'user@exam$ple.com',
      'user@exam#ple.com',
      'user@exam%ple.com',
      'user@exam&ple.com',
      'user@exam*ple.com',
      'user@example.рф',
      'test@пример.рф',
      'user@localhost',
      'user@[192.168.1.1]',
      'user@[999.999.999.999]',
      'user@[192.168.1]',
      'user@[192.168.1.1.1]',
      'user@[192.168.1.1',
      'user@192.168.1.1]',
      'user@[[192.168.1.1]]',
      '@@@@',
      '....',
      '----',
      '____',
      'user@exam..ple.com',
      'us..er@example.com',
      'user@@domain..com',
    ])('should reject email address: %s', (email) => {
      expect(() => emailValidator.compile(email)).toThrow();
    });
  });
});
