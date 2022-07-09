import { getEnvArray } from '../getEnvArray';
import { TestItem, tests } from './getEnvExtends.data';

const testsNames = Object.keys(tests);

jest.mock('../getEnvValue', () => ({
  ...jest.requireActual('../getEnvValue'),
  getEnvValue: jest.fn((name: string): string | undefined => {
    return tests[name].getEnvValueMocked;
  }),
}));

describe('GetEnv Extends', () => {
  it.each(testsNames)(`getEnvArray`, (name) => {
    const { getEnvArrayResult, getEnvArraySplitter: splitter } = tests[
      name
    ] as TestItem;

    expect(getEnvArray(name, splitter)).toEqual(getEnvArrayResult);
  });
});
