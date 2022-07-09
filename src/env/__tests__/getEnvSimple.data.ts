/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/naming-convention */
export const tests = {
  ENV_NOT_EXISTS: {
    getEnvValueMocked: undefined,
    getEnvStringResult: undefined,
    getEnvNumberResult: undefined,
    getEnvBooleanResult: undefined,
  },
  ENV_STRING_VALUE: {
    getEnvValueMocked: 'String value',
    getEnvStringResult: 'String value',
    getEnvNumberResult: undefined,
    getEnvBooleanResult: undefined,
  },
  ENV_NUMBER_VALUE: {
    getEnvValueMocked: '123',
    getEnvStringResult: '123',
    getEnvNumberResult: 123,
    getEnvBooleanResult: undefined,
  },
  ENV_BOOLEAN_VALUE_TRUE: {
    getEnvValueMocked: 'true',
    getEnvStringResult: 'true',
    getEnvNumberResult: undefined,
    getEnvBooleanResult: true,
  },
  ENV_BOOLEAN_VALUE_FALSE: {
    getEnvValueMocked: 'OFF',
    getEnvStringResult: 'OFF',
    getEnvNumberResult: undefined,
    getEnvBooleanResult: false,
  },
};
