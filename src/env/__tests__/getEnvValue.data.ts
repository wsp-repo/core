/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/naming-convention */
export const envs = {
  ENV_PREFIX: 'PREF_',
  PREF_ENV_1: 'Value1 [prefix]',
  PREF_ENV_2: 'Value2 [prefix]',
  ENV_1: 'Value1 [strict]',
  ENV_3: 'Value3 [strict]',
};

export const tests = {
  ENV_1: {
    nameAuto: 'PREF_ENV_1',
    namePrefix: 'PREF_ENV_1',
    nameStrict: 'ENV_1',
    valueAuto: envs.PREF_ENV_1,
    valuePrefix: envs.PREF_ENV_1,
    valueStrict: envs.ENV_1,
  },
  ENV_2: {
    nameAuto: 'PREF_ENV_2',
    namePrefix: 'PREF_ENV_2',
    nameStrict: undefined,
    valueAuto: envs.PREF_ENV_2,
    valuePrefix: envs.PREF_ENV_2,
    valueStrict: undefined,
  },
  ENV_3: {
    nameAuto: 'ENV_3',
    namePrefix: undefined,
    nameStrict: 'ENV_3',
    valueAuto: envs.ENV_3,
    valuePrefix: undefined,
    valueStrict: envs.ENV_3,
  },
  ENV_4: {
    nameAuto: undefined,
    namePrefix: undefined,
    nameStrict: undefined,
    valueAuto: undefined,
    valuePrefix: undefined,
    valueStrict: undefined,
  },
};
