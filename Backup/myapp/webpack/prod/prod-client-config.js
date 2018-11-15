const common = require('./prod-common-config.js');
const webpack = require('webpack');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('../isomorphic-tools')
);

const config = Object.assign(common.config, {
  entry: {
    client: '#/client/client.js'
  },
  output: {
    path: common.buildPath,
    filename: 'static/client.js',
    chunkFilename: 'static/client-[name]-[chunkhash].js',
    publicPath: '/'
  },
  plugins: common.config.plugins.concat([
    new webpack.DefinePlugin({
      __CLIENT__: true
    }),
    webpackIsomorphicToolsPlugin
  ])
});

module.exports = config;
