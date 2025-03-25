/* eslint-disable @typescript-eslint/no-magic-numbers */

import { isUndefined } from '../../helpers/isMethods';

const regExpNum = /^\d+$/;
const regExpStr = new RegExp(
  [
    '^',
    '(?:(?<gb>\\d+)gb?)?',
    '(?:(?<mb>\\d+)mb?)?',
    '(?:(?<kb>\\d+)kb?)?',
    '(?:(?<b>\\d+)b)?',
    '$',
  ].join('(?:[ ]*)'),
  'i',
);

const bytesInKb = 1024;
const bytesInMb = 1024 * bytesInKb;
const bytesInGb = 1024 * bytesInMb;

enum Values {
  GbCeil = 'GbCeil',
  GbFloat = 'GbFloat',
  KbCeil = 'KbCeil',
  KbFloat = 'KbFloat',
  MbCeil = 'MbCeil',
  MbFloat = 'MbFloat',
}

export class FileSize {
  private bytes: number;

  private values: Partial<Record<Values, number>> = {};

  constructor(value: string | number) {
    if (!FileSize.isValid(value)) {
      throw new Error('Incorrect value');
    }

    const strValue = String(value).trim();

    if (typeof value === 'number') {
      this.bytes = value;
    } else if (strValue.match(regExpNum)) {
      this.bytes = Number(value);
    } else {
      const match = strValue.match(regExpStr);
      const { gb, mb, kb, b } = match?.groups || {};

      this.bytes =
        (gb ? Number(gb) * bytesInGb : 0) +
        (mb ? Number(mb) * bytesInMb : 0) +
        (kb ? Number(kb) * bytesInKb : 0) +
        (Number(b) || 0);
    }
  }

  /**
   * Валидирует значение для создания объекта
   */
  public static isValid(value: string | number): boolean {
    if (typeof value === 'number') return value >= 0;

    const strValue = String(value).trim();

    if (strValue.match(regExpNum)) {
      return Number(value) >= 0;
    }

    return Boolean(strValue.match(regExpStr));
  }

  /**
   * Возвращает размер в гигабайтах
   */
  public toGb(ceil?: boolean): number {
    return ceil
      ? this.getCeil(Values.GbCeil, bytesInGb)
      : this.getFloat(Values.GbFloat, bytesInGb);
  }

  /**
   * Возвращает размер в мегабайтах
   */
  public toMb(ceil?: boolean): number {
    return ceil
      ? this.getCeil(Values.MbCeil, bytesInMb)
      : this.getFloat(Values.MbFloat, bytesInMb);
  }

  /**
   * Возвращает размер в килобайтах
   */
  public toKb(ceil?: boolean): number {
    return ceil
      ? this.getCeil(Values.KbCeil, bytesInKb)
      : this.getFloat(Values.KbFloat, bytesInKb);
  }

  /**
   * Возвращает размер в байтах
   */
  public toBytes(): number {
    return this.bytes;
  }

  /**
   * Возвращает дробное значение с кешированием по ключу
   */
  private getFloat(keyValue: Values, divider: number): number {
    if (isUndefined(this.values[keyValue])) {
      const intValue = Math.ceil((1000 * this.bytes) / divider);

      this.values[keyValue] = intValue / 1000;
    }

    return this.values[keyValue];
  }

  /**
   * Возвращает округленное значение с кешированием по ключу
   */
  private getCeil(keyValue: Values, divider: number): number {
    if (isUndefined(this.values[keyValue])) {
      this.values[keyValue] = Math.ceil(this.bytes / divider);
    }

    return this.values[keyValue];
  }
}
