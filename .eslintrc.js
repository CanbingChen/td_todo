module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint'), 'plugin:prettier/recommended'],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    'no-bitwise': 'off', // 代码中可以使用位操作符
    'no-console': 'off', // 允许代码中实用console
    'no-plusplus': 'off', // 允许使用自增运算符
    'react/no-array-index-key': 'off', // 不提倡使用index作为key，但是由于历史数组item有的暂无唯一key，因此关掉
    '@typescript-eslint/camelcase': 'off',
    'new-cap': 'off',
    'consistent-return': 'off', // 允许函数中的不同代码路径返回不同类型的值
    'no-shadow': 'off',
    'no-nested-ternary': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-namespace': 'off',
  },
};
