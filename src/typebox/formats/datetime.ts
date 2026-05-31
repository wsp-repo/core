import { REGEXP_TIME } from 'src/regexps';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;

const isLeapYear = (year: number): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};

export function dateFormat(value: string): boolean {
  const matches: string[] | null = DATE.exec(value);

  if (!matches) return false;

  const year: number = Number(matches[1]);
  const month: number = Number(matches[2]);
  const day: number = Number(matches[3]);

  return (
    month >= 1 &&
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    month <= 12 &&
    day >= 1 &&
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month])
  );
}

/*_ Проверяет строку на соответствие формату времени, с опциональной строгой проверкой таймзоны _*/
export function timeFormat(value: string, strictTimeZone?: boolean): boolean {
  const matches: RegExpExecArray | null = REGEXP_TIME.exec(value);

  if (!matches) return false;

  const hr: number = Number(matches[1]);
  const min: number = Number(matches[2]);
  const sec: number = Number(matches[3]);
  const tz: string | undefined = matches[4];
  const tzSign: number = matches[5] === '-' ? -1 : 1;
  const tzH: number = Number(matches[6] || 0);
  const tzM: number = Number(matches[7] || 0);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (tzH > 23 || tzM > 59 || (strictTimeZone && !tz)) return false;

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (hr <= 23 && min <= 59 && sec < 60) return true;

  const utcMin = min - tzM * tzSign;
  const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
  return (
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    (utcHr === 23 || utcHr === -1) &&
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    (utcMin === 59 || utcMin === -1) &&
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    sec < 61
  );
}

/*_ Регулярка для разделения даты и времени - ISO 8601 требует только 'T' разделитель _*/
const dateTimeSplitRegex = /T/;

/*_ Проверяет строку на соответствие формату даты-времени, с опциональной строгой проверкой таймзоны _*/
export function dateTimeFormat(
  value: string,
  strictTimeZone?: boolean,
): boolean {
  const dateTime: string[] = value.split(dateTimeSplitRegex);

  return (
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    dateTime.length === 2 &&
    dateFormat(dateTime[0]) &&
    timeFormat(dateTime[1], strictTimeZone)
  );
}
