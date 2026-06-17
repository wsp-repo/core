/* eslint-disable @typescript-eslint/no-magic-numbers */

import { isUndefined } from '../helpers';

const regExpNum = /^\d+$/;
const regExpStr = new RegExp(
  [
    '^',
    '(?:(?<d>\\d+)d)?',
    '(?:(?<h>\\d+)h)?',
    '(?:(?<m>\\d+)m)?',
    '(?:(?<s>\\d+)s)?',
    '(?:(?<ms>\\d+)ms)?',
    '$',
  ].join('(?:[ ]*)'),
  'i',
);

const msInSec = 1000;
const msInMin = 60 * msInSec;
const msInHour = 60 * msInMin;
const msInDay = 24 * msInHour;

enum Values {
  HourCeil = 'HourCeil',
  HourFloat = 'HourFloat',
  MinCeil = 'MinCeil',
  MinFloat = 'MinFloat',
  SecCeil = 'SecCeil',
  SecFloat = 'SecFloat',
}

export class Timestamp {
  #ms!: number;

  #values: Partial<Record<Values, number>> = {};

  constructor(value: string | number) {
    if (!Timestamp.isValid(value)) {
      throw new Error('Incorrect value');
    }

    const strValue = String(value).trim();

    if (typeof value === 'number') {
      this.#ms = value;
    } else if (strValue.match(regExpNum)) {
      this.#ms = Number(value);
    } else {
      const match = strValue.match(regExpStr);
      const { d, h, m, s, ms } = match?.groups || {};

      this.#ms =
        (d ? Number(d) * msInDay : 0) +
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
      return Number.isInteger(Number(value));
    }

    return Boolean(strValue.match(regExpStr));
  }

  /**
   * Возвращает время в часах
   */
  public toHour(ceil?: boolean): number {
    return ceil
      ? this.#getCeil(Values.HourCeil, msInHour)
      : this.#getFloat(Values.HourFloat, msInHour);
  }

  /**
   * Возвращает время в минутах
   */
  public toMin(ceil?: boolean): number {
    return ceil
      ? this.#getCeil(Values.MinCeil, msInMin)
      : this.#getFloat(Values.MinFloat, msInMin);
  }

  /**
   * Возвращает время в секундах
   */
  public toSec(ceil?: boolean): number {
    return ceil
      ? this.#getCeil(Values.SecCeil, msInSec)
      : this.#getFloat(Values.SecFloat, msInSec);
  }

  /**
   * Возвращает время в милисекундах
   */
  public toMs(): number {
    return this.#ms;
  }

  /**
   * Возвращает строковое представление
   */
  public toString(): string {
    if (!this.#ms) return '0';

    let ms = this.#ms;
    const result: string[] = [];

    if (ms > msInDay) {
      const intDays = Math.floor(ms / msInDay);

      if (intDays) {
        ms = ms - intDays * msInDay;

        result.push(`${intDays}d`);
      }
    }

    if (ms > msInHour) {
      const intHours = Math.floor(ms / msInHour);

      if (intHours > 0) {
        ms = ms - intHours * msInHour;

        result.push(`${intHours}h`);
      }
    }

    if (ms > msInMin) {
      const intMins = Math.floor(ms / msInMin);

      if (intMins > 0) {
        ms = ms - intMins * msInMin;

        result.push(`${intMins}m`);
      }
    }

    if (ms > msInSec) {
      const intSecs = Math.floor(ms / msInSec);

      if (intSecs > 0) {
        ms = ms - intSecs * msInSec;

        result.push(`${intSecs}s`);
      }
    }

    if (ms > 0) {
      result.push(`${ms}ms`);
    }

    return result.join(' ');
  }

  /**
   * Увеличивает значение времени
   */
  public increase(value: Timestamp | string | number): Timestamp {
    const timestamp = value instanceof Timestamp ? value : new Timestamp(value);

    this.#ms += timestamp.toMs();

    return this;
  }

  /**
   * Уменьшает значение времени
   */
  public decrease(value: Timestamp | string | number): Timestamp {
    const timestamp = value instanceof Timestamp ? value : new Timestamp(value);

    if (this.#ms < timestamp.toMs()) {
      throw new Error('The value is too high');
    }

    this.#ms -= timestamp.toMs();

    return this;
  }

  /**
   * Возвращает дробное значение с кешированием по ключу
   */
  #getFloat(keyValue: Values, divider: number): number {
    if (isUndefined(this.#values[keyValue])) {
      const intValue = Math.ceil((1000 * this.#ms) / divider);

      this.#values[keyValue] = intValue / 1000;
    }

    return this.#values[keyValue];
  }

  /**
   * Возвращает округленное значение с кешированием по ключу
   */
  #getCeil(keyValue: Values, divider: number): number {
    if (isUndefined(this.#values[keyValue])) {
      this.#values[keyValue] = Math.ceil(this.#ms / divider);
    }

    return this.#values[keyValue];
  }
}
