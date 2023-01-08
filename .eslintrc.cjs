const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    ignorePatterns: [
        'node_modules',
        'dist',
        'coverage',
        '.eslintrc.cjs',
        '.prettierrc.cjs',
        'jest.config.cjs',
    ],
    root: true,
});
