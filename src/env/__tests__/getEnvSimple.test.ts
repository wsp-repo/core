import { getEnvBoolean } from '../getEnvBoolean';
import { getEnvNumber } from '../getEnvNumber';
import { getEnvString } from '../getEnvString';
import { tests } from './getEnvSimple.data';

const testsNames = Object.keys(tests);

jest.mock('../getEnvValue', () => ({
  ...jest.requireActual('../getEnvValue'),
  getEnvValue: jest.fn((name: string): string | undefined => {
    return tests[name].getEnvValueMocked;
  }),
}));

describe('GetEnv Simple', () => {
  it.each(testsNames)(`getEnvString`, (name) => {
    const { getEnvStringResult } = tests[name];

    expect(getEnvString(name)).toEqual(getEnvStringResult);
  });

  it.each(testsNames)(`getEnvNumber`, (name) => {
    const { getEnvNumberResult } = tests[name];

    expect(getEnvNumber(name)).toEqual(getEnvNumberResult);
  });

  it.each(testsNames)(`getEnvBoolean`, (name) => {
    const { getEnvBooleanResult } = tests[name];

    expect(getEnvBoolean(name)).toEqual(getEnvBooleanResult);
  });
});
