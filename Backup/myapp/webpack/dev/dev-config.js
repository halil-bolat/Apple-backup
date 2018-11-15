/*
 * Webpack config for the development environment
 */

require('babel-polyfill');

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const WebpackShellPlugin = require('webpack-shell-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('../isomorphic-tools')
);

const alias = require('../alias');

const srcPath = path.resolve(__dirname, '../../src');
const contextPath = path.resolve(__dirname, '../..');
const assetsPath = path.resolve(__dirname, '../../build/static');

const host =
  process.env.DEV_VM_MODE !== 'true' && process.env.HOST
    ? process.env.HOST
    : 'localhost';
const port = +process.env.PORT + 1 || 3001;

const devServerUrl = `http://${host}:${port}`;
const publicPath = `${devServerUrl}/dist/`;

const useSourceMap = true;
const enableLinting = false;

// If node modules provide module keyword, transpile those packages as well
const transpileNodeModules = true;

// Preparing a Babel loader to be used for all
// JS files. Defining the babel settings in 'options',
// these would typically correlate with settings in a .babelrc file
const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['vdkweb', 'react-hmre'],
    cacheDirectory: true
  }
};

// If we want linting enabled, we add an ESLint loader to the list of JS loaders.
// This will use the .eslintrc file in your project root.
const jsLoaders = [babelLoader].concat(enableLinting ? ['eslint-loader'] : []);

const jsExcludePath = transpileNodeModules
  ? /node_modules\/(?!(([^/]+?\/){1,2}(src|es6)))/
  : /node_modules/;

// Only include if we transpile node modules
const jsIncludePath = [srcPath];

const plugins = [
  // Enable Hot Module Replacement to quickly get your
  // views updated after code changes.
  new webpack.HotModuleReplacementPlugin(),

  // Define globabl variables used in your code
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __DEVELOPMENT__: true,
    __DEBUG__: true,
    __TEST__: false,
    __DEVTOOLS__: true
  }),

  // Isomorphic tools is used to manage resources universally
  // so we're able to deliver e.g. CSS files from the node server
  // even though we're importing them like any other JS file.
  webpackIsomorphicToolsPlugin.development(),

  // Triggering scripts after the Webpack build is complete.
  // In this case we'll automatically open the app in the
  // default browser.
  new WebpackShellPlugin({
    onBuildEnd: [
      'echo Build complete. Opening browser',
      'node ./helpers/browseDevServer'
    ]
  })
];

if (process.env.DEV_WITHOUT_DLL_PLUGIN !== 'true') {
  plugins.push(
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '../../src'),
      manifest: require('../dll/vendor-manifest.json')
    })
  );
}

// Define the bulk of the configuration which will be exported.
const config = {
  // Do we want to generate source maps?
  devtool: useSourceMap ? 'eval-source-map' : '',

  // Define the base context for your files
  context: contextPath,

  // for missing fs package
  node: {
    fs: 'empty'
  },

  // Specify the entry points for your application, these
  // will make the base for your dependency chain and thus
  // decide on what will go into the built bundles.
  entry: {
    client: [
      `webpack-hot-middleware/client?path=${devServerUrl}/__webpack_hmr`,
      '#/client/client.js'
    ]
  },

  // Define the settings for the outputted files of
  // the Webpack build.
  output: {
    path: assetsPath,
    publicPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js'
  },

  module: {
    // This is the pipeline of your loaders that will
    // transform your files in their respective way.
    // These allow us to handle different kinds of resources
    // such as images, CSS and JS files.
    rules: [
      {
        test: /\.js$/,
        exclude: jsExcludePath,
        include: jsIncludePath,
        use: jsLoaders
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=100&name=images/[hash].[ext]'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: { plugins: () => [autoprefixer({ browsers: ['> 1%'] })] }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|ttf|eot)/,
        loader:
          'url-loader?limit=10000&name=fonts/[name].[ext]&mimetype=application/font-[ext]'
      },
      {
        test: /\.svg$/,
        loader:
          'url-loader?limit=10000&name=fonts/[name].[ext]&mimetype=image/svg+xml'
      }
    ],

    // Suppress warnings about expressions as dependencies
    exprContextCritical: false
  },

  // Settings for resolution of files, modules, etc.
  resolve: {
    modules: ['node_modules'],

    // Define extensions that will be automatically resolved
    // without having to specify the extension in the import.
    extensions: ['.json', '.js', '.jsx'],

    // Defines resolution aliases for imported modules.
    // Check out webpack/alias.js to see which routes are in
    // play. This e.g. makes sure that when starting an import path
    // with '#' it will reference the path from the 'src' folder.
    //
    // import config from '#/config'
    //
    // from a file in the src/containers folder would then
    // be the same thing as:
    //
    // import config from '../config'
    //
    alias
  },

  plugins
};

module.exports = config;
