import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['public/**', 'dist/**', 'out/**', '.next/**', 'node_modules/**', 'test-results/**', 'playwright-report/**', 'src/engine/**', 'next-env.d.ts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
);
