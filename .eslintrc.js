module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['prettier'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: { 'react/prop-types': ['off'], '@typescript-eslint/no-unused-expressions': 0 },
  ignorePatterns: ['.eslintrc.js', 'webpack.config.js'],
};
