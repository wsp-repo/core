/* eslint-disable @typescript-eslint/no-magic-numbers */

import { isUndefined } from '../../helpers/isMethods';

const regExpNum = /^\d+$/;
const regExpStr = new RegExp(
  [
    '^',
    '(?:(?<h>\\d+)h)?',
    '(?:(?<m>\\d+)m)?',
    '(?:(?<s>\\d+)s)?',
    '(?:(?<ms>\\d+)ms)?',
    '$',
  ].join('(?:[ ]*)'),
  'i',
);
const regExpPos = /[1-9]/;

const msInSec = 1000;
const msInMin = 60 * msInSec;
const msInHour = 60 * msInMin;

enum Values {
  MinCeil = 'MinCeil',
  MinFloat = 'MinFloat',
  SecCeil = 'SecCeil',
  SecFloat = 'SecFloat',
}

export class Timespan {
  private ms!: number;

  private values: Partial<Record<Values, number>> = {};

  constructor(value: string | number) {
    if (!Timespan.isValid(value)) {
      throw new Error('Incorrect value');
    }

    const strValue = String(value).trim();

    if (typeof value === 'number') {
      this.ms = value;
    } else if (strValue.match(regExpNum)) {
      this.ms = Number(value);
    } else {
      const match = strValue.match(regExpStr);
      const { h, m, s, ms } = match?.groups || {};

      this.ms =
        (h ? Number(h) * msInHour : 0) +
        (m ? Number(m) * msInMin : 0) +
        (s ? Number(s) * msInSec : 0) +
        (Number(ms) || 0);
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

    // prettier-ignore
    return Boolean(strValue.match(regExpStr))
      && Boolean(strValue.match(regExpPos));
  }

  /**
   * Возвращает время в минутах
   */
  public toMin(ceil?: boolean): number {
    return ceil
      ? this.getCeil(Values.MinCeil, msInMin)
      : this.getFloat(Values.MinFloat, msInMin);
  }

  /**
   * Возвращает время в секундах
   */
  public toSec(ceil?: boolean): number {
    return ceil
      ? this.getCeil(Values.SecCeil, msInSec)
      : this.getFloat(Values.SecFloat, msInSec);
  }

  /**
   * Возвращает время в милисекундах
   */
  public toMs(): number {
    return this.ms;
  }

  /**
   * Возвращает дробное значение с кешированием по ключу
   */
  private getFloat(keyValue: Values, divider: number): number {
    if (isUndefined(this.values[keyValue])) {
      const intValue = Math.ceil((1000 * this.ms) / divider);

      this.values[keyValue] = intValue / 1000;
    }

    return this.values[keyValue];
  }

  /**
   * Возвращает округленное значение с кешированием по ключу
   */
  private getCeil(keyValue: Values, divider: number): number {
    if (isUndefined(this.values[keyValue])) {
      this.values[keyValue] = Math.ceil(this.ms / divider);
    }

    return this.values[keyValue];
  }
}
