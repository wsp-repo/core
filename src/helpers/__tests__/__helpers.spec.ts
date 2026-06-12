import { TestOptions, describe, it, expect } from 'vitest';

const isDebug = Boolean(process.env.VSCODE_INSPECTOR_OPTIONS);
const itOptions = { timeout: isDebug ? 600000 : 1000 };

export function getOptions(options?: TestOptions): TestOptions {
  return { ...itOptions, ...options };
}

// заглушка для тестирования
describe('Tests helpers', () => {
  it(() => expect(true).toBe(true));
});
