import config from 'eslint-config-standard';
import js from '@eslint/js';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    ignores: ['.config/*'],
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'no-undef': 'error',
      semi: 'error',
      'prefer-const': 'error',
      indent: ['error', 2],
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: 'error',
    },
  },
  ...[].concat(config),
];
