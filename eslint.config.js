/* eslint-disable import-x/no-named-as-default-member */

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const config = tseslint.config(
    {
      ignores: ['.next', 'node_modules'],
    },
    // Base
    js.configs.recommended,
    ...compat.extends('plugin:@next/next/recommended'),
    {
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
          ecmaFeatures: {
            jsx: true,
          },
        },
        globals: {
          ...globals.browser,
          ...globals.node,
        },
      },
      settings: {
        tailwindcss: {
          callees: ['classnames', 'clsx', 'ctl', 'cn', 'cva'],
        },
      },
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],

        '@typescript-eslint/consistent-type-imports': [
          'warn',
          { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
        ],

        '@typescript-eslint/no-misused-promises': [
          'error',
          { checksVoidReturn: { attributes: false } },
        ],

        '@typescript-eslint/no-unnecessary-condition': [
          'error',
          {
            allowConstantLoopConditions: true,
          },
        ],

        '@typescript-eslint/consistent-type-exports': [
          'error',
          { fixMixedExportsWithInlineTypeSpecifier: true },
        ],

        'import-x/no-unresolved': ['error', { ignore: ['geist'] }],
      },
    },

    {
      files: ['**/*.cjs', '**/*.cts'],
      languageOptions: {
        sourceType: 'commonjs',
      },
    },

    // Prettier rules (Disables conflicting formatting rules)
    prettierConfig,
    // Recommended Prettier config for eslint-plugin-prettier
    {
      extends: ['plugin:prettier/recommended'],
    }
)

export default config

/* eslint-enable import-x/no-named-as-default-member */
