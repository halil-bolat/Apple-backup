/**
 * Configuration for building static HTML with XDK configuration
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Base this configuration on the static config.
const staticConfig = require('./prod-static-config.js');

// For TV we do not need to specify the publicPath
delete staticConfig.output.publicPath;

// Copy XDK static and platform specific files to build folder
const config = Object.assign(staticConfig, {
  entry: {
    client: staticConfig.entry.client,
    vendor: staticConfig.entry.vendor
      ? staticConfig.entry.vendor.concat(['xdk3'])
      : ['xdk3']
  },
  plugins: staticConfig.plugins.concat([
    new CopyWebpackPlugin([
      {
        from: 'src/static/xdk3'
      }
    ])
  ])
});

// Export the configuration
module.exports = config;
