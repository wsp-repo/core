/*_ Регулярка для строки в camelCase _*/
export const REGEXP_CAMEL_CASE = /^[a-z][a-z0-9]*(?:[A-Z][a-z0-9]*)*$/;

/*_ Регулярка для строки в UPPER_CASE _*/
export const REGEXP_UPPER_CASE = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;

/*_ Регулярка для строки в PascalCase _*/
export const REGEXP_PASCAL_CASE =
  /^[A-Z](?:[A-Za-z0-9]*[a-z0-9][A-Za-z0-9]*)?$/;
