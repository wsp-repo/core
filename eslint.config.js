const {
  defineConfig,
  getNodeJsConfig,
  getNodeTsConfig,
  getTestsConfig,
} = require('@zalib/devkit/eslint');

module.exports = defineConfig([
  { ignores: ['**/node_modules/**', '**/dist/**'] },
  ...getNodeJsConfig(),
  ...getNodeTsConfig(),
  ...getTestsConfig(),
]);
