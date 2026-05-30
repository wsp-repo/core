/* prettier-ignore */
enum CodeTypes { Upper, Lower, Number, Skip }

const numbers = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
const uppers = ['A'.charCodeAt(0), 'Z'.charCodeAt(0)];
const lowers = ['a'.charCodeAt(0), 'z'.charCodeAt(0)];
const castDelta = lowers[0] - uppers[0];

/**
 * Возвращает тип символа по коду
 */
function getCodeType(code: number): CodeTypes {
  if (code >= numbers[0] && code <= numbers[1]) {
    return CodeTypes.Number;
  }

  if (code >= uppers[0] && code <= uppers[1]) {
    return CodeTypes.Upper;
  }

  if (code >= lowers[0] && code <= lowers[1]) {
    return CodeTypes.Lower;
  }

  return CodeTypes.Skip;
}

/**
 * Переводит lower-case код в upper-case
 */
function toUpper(code: number, codeType: CodeTypes): number {
  return codeType === CodeTypes.Lower ? code - castDelta : code;
}

/**
 * Переводит upper-case код в lower-case
 */
function toLower(code: number, codeType: CodeTypes): number {
  return codeType === CodeTypes.Upper ? code + castDelta : code;
}

export function camelCase(input: string): string {
  if (input.length === 0) return input;

  const result = [];

  let prevType = CodeTypes.Skip;

  for (let i = 0; i < input.length; i++) {
    const currCode = input.charCodeAt(i);
    const currType = getCodeType(currCode);

    // зафиксировать символы разделители
    if (currType === CodeTypes.Skip) {
      prevType = currType;

      continue;
    }

    // начинать всегда с lower-case
    if (result.length === 0) {
      const setCode = toLower(currCode, currType);

      result.push(String.fromCharCode(setCode));

      prevType = currType;

      continue;
    }

    // цифровые символы остаются как есть
    if (currType === CodeTypes.Number) {
      result.push(String.fromCharCode(currCode));

      prevType = currType;

      continue;
    }

    // после разделителя д.б. upper-case
    if (prevType === CodeTypes.Skip) {
      const setCode = toUpper(currCode, currType);

      result.push(String.fromCharCode(setCode));

      prevType = currType;

      continue;
    }

    // после upper-case д.б. lower-case
    if (prevType === CodeTypes.Upper) {
      if (i < input.length - 1) {
        const nextCode = input.charCodeAt(i + 1);
        const nextType = getCodeType(nextCode);

        // если следущий lower, то не менять
        if (nextType === CodeTypes.Lower) {
          result.push(String.fromCharCode(currCode));

          prevType = currType;

          continue;
        }
      }

      const setCode = toLower(currCode, currType);

      result.push(String.fromCharCode(setCode));

      prevType = currType;

      continue;
    }

    // по умолчанию просто прямой перенос
    result.push(String.fromCharCode(currCode));

    prevType = currType;
  }

  return result.join('');
}
