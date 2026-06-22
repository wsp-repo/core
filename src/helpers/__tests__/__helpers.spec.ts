import { TestOptions, describe, it, expect } from 'vitest';

const isDebug = Boolean(process.env.VSCODE_INSPECTOR_OPTIONS);
const itOptions = { timeout: isDebug ? 600000 : 1000 };

export function getOptions(options?: TestOptions): TestOptions {
  return { ...itOptions, ...options };
}

describe('Helpers', () => {
  describe('For tests', () => {
    it('getOptions', () => {
      expect(getOptions()).toEqual(itOptions);
      expect(getOptions({ timeout: 100 })).toEqual({
        ...itOptions,
        timeout: 100,
      });
    });
  });
});
