module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    '@jetrockets/base',
    '@jetrockets/react',
    '@jetrockets/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    'react/no-children-prop': 0,
    'react/prop-types': 0,
    'react-hooks/exhaustive-deps': 1,
    'react-hooks/rules-of-hooks': 0,
    'jsx-quotes': ['error', 'prefer-double'],
    'comma-dangle': 'off',
    quotes: ['error', 'single', { avoidEscape: true }],
  },

  settings: {
    'import/ignore': ['node_modules/react-native/index\\.js$'],
  },
};
