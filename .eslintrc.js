module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: 'standard',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'space-before-function-paren': [0, 'never'],
    'comma-dangle': [0, 'never'],
  },
}
