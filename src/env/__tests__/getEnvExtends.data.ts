/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/naming-convention */
export const tests = {
  ENV_NOT_EXISTS: {
    getEnvValueMocked: undefined,
    getEnvArrayResult: undefined,
  },
  ENV_ARRAY_2: {
    getEnvValueMocked: 'String value',
    getEnvArrayResult: ['String', 'value'],
  },
  ENV_ARRAY_1: {
    getEnvValueMocked: '123',
    getEnvArrayResult: ['123'],
  },
  ENV_ARRAY_EMPTY_1: {
    getEnvValueMocked: '',
    getEnvArrayResult: [],
  },
  ENV_ARRAY_EMPTY_2: {
    getEnvValueMocked: '       ',
    getEnvArrayResult: [],
  },
  ENV_ARRAY_SPLITTER_1: {
    getEnvValueMocked: '1,22,333',
    getEnvArraySplitter: ',',
    getEnvArrayResult: ['1', '22', '333'],
  },
  ENV_ARRAY_SPLITTER_2: {
    getEnvValueMocked: '1,22,333',
    getEnvArraySplitter: /,+/,
    getEnvArrayResult: ['1', '22', '333'],
  },
  ENV_ARRAY_SPLITTER_3: {
    getEnvValueMocked: '1,22,333',
    getEnvArraySplitter: ';',
    getEnvArrayResult: ['1,22,333'],
  },
};
