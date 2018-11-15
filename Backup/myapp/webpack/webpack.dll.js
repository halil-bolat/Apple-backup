const path = require('path');
const webpack = require('webpack');

const pjson = require('../package.json');

// Some of these dependencies may be removed for TV or Web
const vendor = [
  'lodash',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'react-router-redux',
  'react-list',
  'redux',
  'redux-actions',
  'redux-thunk',
  'redux-promise',
  '@accedo/accedo-one',
  'prop-types',
  'react-helmet',
  'react-cookie',
  'xdk3',
  'material-ui',
  'mux.js',
  'pako',
  'vdkweb-winston',
  'vdkweb-winston-accedo-one',
  'mobile-detect'
].filter(d => pjson.dependencies[d] || pjson.devDependencies[d]);

module.exports = {
  entry: {
    vendor
  },
  output: {
    path: path.join(__dirname, 'dll'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]',
      context: path.resolve(__dirname, '../src')
    })
  ]
};
