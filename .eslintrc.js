/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      './tsconfig.eslint.json',
      './nextjs-example/tsconfig.json',
      './reactjs-example/tsconfig.json',
    ],
  },
  plugins: ['react', '@typescript-eslint', 'unused-imports'],
  rules: {
    'no-param-reassign': [2, { 'props': false }],
    'no-unused-vars': [0],
    'no-unused-expressions': [0],
    'no-use-before-define': [0],
    'consistent-return': [0],
    'no-shadow': [0],

    'prettier/prettier': [1],

    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/prop-types': [0],
    'react/no-unused-prop-types': [0],
    'react/require-default-props': [0],
    'react/react-in-jsx-scope': [0],
    'react/function-component-definition': [2, { 'namedComponents': 'arrow-function' }],
    'react/jsx-props-no-spreading': [0],

    'import/extensions': [
      2,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [0, { devDependencies: false }],
    'import/prefer-default-export': [0],

    '@typescript-eslint/no-unused-vars': 0,
    'unused-imports/no-unused-imports': 1,
    'unused-imports/no-unused-vars': [
      1,
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    '@typescript-eslint/ban-types': 1,
    '@typescript-eslint/restrict-template-expressions': [0],
    '@typescript-eslint/no-unsafe-assignment': [0],
    '@typescript-eslint/no-unsafe-return': [0],
    '@typescript-eslint/no-unsafe-call': [0],
    '@typescript-eslint/no-unsafe-member-access': [0],
    '@typescript-eslint/no-unsafe-argument': [0],
    '@typescript-eslint/consistent-type-imports': 1,
  },
  globals: {
    React: 'readonly',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
