/* eslint-disable @typescript-eslint/naming-convention */
import { EnvNameType, getEnvName, getEnvValue } from '../getEnvValue';
import { envs, tests } from './getEnvValue.data';

const testsNames = Object.keys(tests);

describe('GetEnv Name', () => {
  beforeEach(() => {
    process.env = {
      ...process.env,
      ...envs,
    };
  });

  it.each(testsNames)(`getEnvName(auto)`, (name) => {
    const { nameAuto } = tests[name];

    expect(getEnvName(name)).toEqual(nameAuto);
  });

  it.each(testsNames)(`getEnvName(prefix)`, (name) => {
    const { namePrefix } = tests[name];

    expect(getEnvName(name, EnvNameType.Prefix)).toEqual(namePrefix);
  });

  it.each(testsNames)(`getEnvName(strict)`, (name) => {
    const { nameStrict } = tests[name];

    expect(getEnvName(name, EnvNameType.Strict)).toEqual(nameStrict);
  });
});

describe('GetEnv Value', () => {
  beforeEach(() => {
    process.env = {
      ...process.env,
      ...envs,
    };
  });

  it.each(testsNames)(`getEnvValue(auto)`, (name) => {
    const { valueAuto } = tests[name];

    expect(getEnvValue(name)).toEqual(valueAuto);
  });

  it.each(testsNames)(`getEnvValue(prefix)`, (name) => {
    const { valuePrefix } = tests[name];

    expect(getEnvValue(name, EnvNameType.Prefix)).toEqual(valuePrefix);
  });

  it.each(testsNames)(`getEnvValue(strict)`, (name) => {
    const { valueStrict } = tests[name];

    expect(getEnvValue(name, EnvNameType.Strict)).toEqual(valueStrict);
  });
});
