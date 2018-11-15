const common = require('./prod-common-config.js');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = Object.assign(common.config, {
  target: 'node',
  node: {
    __dirname: false
  },
  entry: '#/server/server.js',
  output: {
    path: common.buildPath,
    filename: 'server.js',
    chunkFilename: 'server-[name]-[chunkhash].js',
    libraryTarget: 'commonjs2',
    publicPath: ''
  },
  externals: [
    {
      'client-assets': './assets.json'
    }
    // All non-relative path modules and the ones not starting with 'vdk'
    // /^(?!vdk|\.|\/)[\w\-\.\/]+$/
  ],
  plugins: common.config.plugins.concat([
    new webpack.DefinePlugin({
      __CLIENT__: false
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/static/favicon.ico',
        to: 'static/favicon.ico'
      }
    ])
  ])
});

module.exports = config;
