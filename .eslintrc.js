module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/react',
  ],
  plugins: [
    'react',
    'prettier',
    '@typescript-eslint',
  ],
  rules: {
    'prettier/prettier': 'error'
  },
  settings: {
    'react': {
      'version': 'detect'
    }
  },
  overrides: [
    {
      'files': ['**/*.tsx'],
      'rules': {
        'react/prop-types': 'off'
      }
    }
  ]
}
