/**
 * An Express Webpack development server hooked up
 * to webpack-dev-middleware and webpack-hot-middleware
 * to get the webpack dev server features and hot reloading.
 *
 * NOTE: This should ONLY be used for DEVELOPMENT
 */

const Express = require('express');
const webpack = require('webpack');

const DEFAULT_PORT = 3001;
const DEFAULT_HOST = 'localhost';

const configureServer = (options, webpackConfig) => {
  const compiler = webpack(webpackConfig);

  const host = options.host || DEFAULT_HOST;
  const port = options.port || DEFAULT_PORT;

  const contentBase = `http://${host}:${port}`;
  const { publicPath } = webpackConfig.output;

  // Create the dev server configurations
  const serverOptions = Object.assign(
    {},
    {
      contentBase,
      publicPath,
      quiet: true,
      noInfo: true,
      hot: true,
      inline: true,
      lazy: false,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      stats: {
        colors: true
      }
    },
    options
  );

  // Create the Express server
  const app = new Express();

  // Apply the dev middleware with the webpack dev server configurations
  app.use(require('webpack-dev-middleware')(compiler, serverOptions));

  // Apply the hot middleware to enable hot module reloading
  app.use(require('webpack-hot-middleware')(compiler));

  return app;
};

module.exports = {
  configureServer,
  DEFAULT_PORT,
  DEFAULT_HOST
};
