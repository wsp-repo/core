/*_ Регулярка для даты в формате YYYY-MM-DD _*/
export const REGEXP_DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/i;

/*_ Регулярка для времени в формате HH:MM:SS(.sss)?(Z|±HH:MM)? _*/
export const REGEXP_TIME =
  /^(\d\d):(\d\d):(\d\d(?:\.\d{1,3})?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;

/*_ Регулярка для даты и времени в формате YYYY-MM-DDTHH:MM:SS(.sss)?(Z|±HH:MM)? _*/
export const REGEXP_DATETIME =
  /^(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d(?:\.\d{1,3})?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
