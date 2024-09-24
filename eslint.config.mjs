import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    ignores: [
      '**/dist/*',
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettierConfig,
  {
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
    },
    rules: {
      // General rules
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'no-console': 'warn',
      'eqeqeq': 'error',

      // TypeScript specific rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',

      // React specific rules
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-key': 'error',
      'react/self-closing-comp': 'error',
    },
    settings: {
      react: {
        version: '18', // Specify React version explicitly
      },
    },
  },
];
