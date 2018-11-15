const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// Webpack config for production
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const buildPath = path.resolve(__dirname, '../../build');
const staticRootPath = path.resolve(__dirname, '../../src');
const contextPath = path.resolve(__dirname, '../..');

const alias = require('../alias');

const useSourceMap = true;
const enableLinting = true;

// If node modules provide module keyword, transpile those packages as well
const transpileNodeModules = true;

// Preparing a Babel loader to be used for all
// JS files. Defining the babel settings in 'options',
// these would typically correlate with settings in a .babelrc file
const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['vdkweb']
  }
};

// If we want linting enabled, we add an ESLint loader to the list of JS loaders.
// This will use the .eslintrc file in your project root.
const jsLoaders = [babelLoader].concat(enableLinting ? ['eslint-loader'] : []);

// jsExcludePath
// Exclude paths in node_modules but whitelist a few folders:
// src, es6 and dist
//
// jsIncludePath
// Include paths + pick the path with regex included
//
// e.g. 'dist' folders with '@accedo/accedo-one' in path name will be included
// NOTE: for paths within node_modules, please use `main` or `module` to specify paths
//

const jsExcludePath = transpileNodeModules
  ? /node_modules\/(?!(([^/]+?\/){1,2}(src|es6|dist)))/
  : /node_modules/;

// Only include if we transpile node modules
const jsIncludePath = transpileNodeModules
  ? [
      /@accedo\/accedo-one/,
      // Include modules here to transplie with
      staticRootPath
    ]
  : [staticRootPath];

const config = {
  devtool: useSourceMap ? 'source-map' : '',
  context: contextPath,
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: jsExcludePath,
        include: jsIncludePath,
        use: jsLoaders
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(jpeg|jpg|png|gif)$/,
        loader: 'url-loader?limit=1024&name=static/images/[hash].[ext]'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            `css-loader?modules&root=${staticRootPath}&minimize=true`,
            'sass-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('stylelint'),
                  autoprefixer({ browsers: ['last 10 versions'] }),
                  require('postcss-reporter', { clearMessages: true })
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?minimize=true')
      },
      {
        test: /\.(woff|woff2|ttf|eot)/,
        loader:
          'url-loader?limit=10000&name=static/fonts/[name].[ext]&mimetype=application/font-[ext]'
      },
      {
        test: /\.svg$/,
        loader:
          'url-loader?limit=10000&name=static/fonts/[name].[ext]&mimetype=image/svg+xml'
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    alias
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __TEST__: false
    }),
    new ExtractTextPlugin({
      filename: 'static/css/bundle.css',

      // Required to extract CSS from
      // dynamically imported modules
      allChunks: true
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          comparisons: false
        }
      }
    })
  ]
};

module.exports = {
  config,
  buildPath
};
