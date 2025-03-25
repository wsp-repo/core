import { dirname, resolve } from 'path';

import { fsStatSafe, getRootPath } from '../fsMethods';

describe('Helpers checkers is...', () => {
  it('fsStatSafe', () => {
    expect(fsStatSafe(__filename)?.isFile()).toEqual(true);
    expect(fsStatSafe(__dirname)?.isDirectory()).toEqual(true);

    const throwPath = resolve(__dirname, 'throwDir');
    expect(fsStatSafe(throwPath)).toEqual(null);
  });

  it('getRootPath', () => {
    const helpersPath = dirname(__dirname);
    const srcPath = dirname(helpersPath);
    const rootPath = dirname(srcPath);

    expect(getRootPath()).toEqual(rootPath);
  });
});
