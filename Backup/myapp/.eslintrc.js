module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    jest: true,
    node: true
  },
  plugins: ['react', 'import', 'jsx-a11y'],
  extends: 'vdkweb',
  settings: {
    'import/parser': 'babel-eslint'
  },
  globals: {
    __DEBUG__: true,
    __DEVTOOLS__: true,
    __DISABLE_SSR__: true,
    __DEVELOPMENT__: true,
    __TEST__: true,
    __CLIENT__: true,
    __TV__: true,
    __HISTORY_TYPE__: true,
    webpackIsomorphicTools: true
  },
  rules: {
    'prefer-promise-reject-errors': 0,

    'react/no-array-index-key': 0,
    'react/no-children-prop': 0,
    'react/no-unescaped-entities': 0,
    'react/require-default-props': 0,

    'import/default': 'error',
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/no-unresolved': [2, { ignore: ['#', '~'] }],
    'import/no-useless-path-segments': 'error',

    'import/extensions': [
      2,
      'never',
      {
        css: 'always',
        jpg: 'always',
        json: 'always',
        png: 'always',
        scss: 'always',
        svg: 'always'
      }
    ],

    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/mouse-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-tabindex': 0,
    'jsx-a11y/no-static-element-interactions': 0
  }
};
