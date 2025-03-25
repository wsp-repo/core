/* eslint-disable no-empty */

import { Stats, statSync } from 'fs';
import { platform } from 'os';
import { dirname, resolve } from 'path';

/**
 * Безопасный аналог fs.statSync
 */
export function fsStatSafe(path: string): Stats | null {
  try {
    return statSync(path);
  } catch (e) {}

  return null;
}

// Кеш для значения
let rootPath: string;

/**
 * Возвращает путь до корня проекта (package.json)
 */
export function getRootPath(): string | null {
  if (rootPath) return rootPath;

  const minLength = platform() === 'win32' ? 3 : 1;

  let checkPath = resolve(process.cwd());

  while (checkPath.length > minLength) {
    const packagePath = resolve(checkPath, 'package.json');

    if (fsStatSafe(packagePath)?.isFile()) {
      return (rootPath = checkPath);
    }

    // проверка, что уже дошло до корня FS
    if (checkPath === dirname(checkPath)) {
      return null;
    }

    checkPath = dirname(checkPath);
  }

  return null;
}
