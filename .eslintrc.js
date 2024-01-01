module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', '@typescript-eslint', 'prettier'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    indent: 0,
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: ['error', 'always'],
    strict: ['error', 'global'],
    'no-eval': ['error'],
    eqeqeq: ['error'],
    'max-params': ['error', 6],
    'prettier/prettier': 2,
  },
};