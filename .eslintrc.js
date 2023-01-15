const path = require('path')
const fs = require('fs')

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  env: {
    browser: true,
    es2019: true,
    jest: true
  },
  extends: 'standard-with-typescript',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    'multiline-comment-style': ['warn', 'starred-block'],
    'space-before-function-parentheses': 'off'
  },
  reportUnusedDisableDirectives: true,
  ignorePatterns: fs.readFileSync(
    path.resolve(__dirname, '.gitignore'),
    { flag: 'r' }
  ).toString().split('\n')
}
