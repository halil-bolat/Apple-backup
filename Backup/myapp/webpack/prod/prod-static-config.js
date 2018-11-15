/*
 * Configuration for building a static HTML page linking to the client
 * entry javascript and CSS.
 *
 * Almost the same configuration as for the client, but this uses
 * the html-webpack-plugin with a static index.html template (src/static/index.ejs).
 * Also, we're setting relative paths for the client.js and bundle.css files.
 */
require('babel-polyfill');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Base this configuration on the client config.
const clientConfig = require('./prod-client-config.js');

// Changing the static path for client.js to a relative path, and
// adding the HtmlWebpackPlugin pointing out our index.ejs template.
const config = Object.assign(clientConfig, {
  entry: {
    client: ['babel-polyfill', clientConfig.entry.client]
  },
  output: Object.assign(clientConfig.output, { publicPath: '/' }),
  plugins: clientConfig.plugins.concat([
    new webpack.DefinePlugin({
      __HISTORY_TYPE__: '"hashHistory"'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'static/js/vendor.js'
    }),
    new HtmlWebpackPlugin({
      template: './src/static/index.ejs',
      DEV_ENV: process.env.DEV_ENV
    })
  ])
});

// Export the configuration
module.exports = config;
