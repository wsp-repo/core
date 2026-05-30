import { FormatRegistry, Type } from '@sinclair/typebox';
import { describe, it, expect } from 'vitest';

import { TypeboxValidator } from '../../validator';

import { TypeboxFormats } from '../../types';

describe('TypeBox formats registration', () => {
  // Импорт TypeboxValidator автоматически регистрирует форматы
  new TypeboxValidator(Type.String());

  it('should register email format', () => {
    expect(FormatRegistry.Get(TypeboxFormats.Email)).toBeDefined();
  });

  it('should register uuid format', () => {
    expect(FormatRegistry.Get(TypeboxFormats.Uuid)).toBeDefined();
  });

  it('should register url format', () => {
    expect(FormatRegistry.Get(TypeboxFormats.Url)).toBeDefined();
  });

  it('should register uri format', () => {
    expect(FormatRegistry.Get(TypeboxFormats.Uri)).toBeDefined();
  });

  it('should register ipv4 format', () => {
    expect(FormatRegistry.Get(TypeboxFormats.Ipv4)).toBeDefined();
  });

  it('should register ipv6 format', () => {
    expect(FormatRegistry.Get(TypeboxFormats.Ipv6)).toBeDefined();
  });

  it('should register date format', () => {
    expect(FormatRegistry.Get(TypeboxFormats.Date)).toBeDefined();
  });

  it('should register time format', () => {
    expect(FormatRegistry.Get(TypeboxFormats.Time)).toBeDefined();
  });

  it('should register datetime format', () => {
    expect(FormatRegistry.Get(TypeboxFormats.DateTime)).toBeDefined();
  });
});
