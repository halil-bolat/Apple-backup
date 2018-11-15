/**
 * https://www.npmjs.com/package/webpack-isomorphic-tools
 */
const path = require('path');
const alias = require('./alias');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin'); // eslint-disable-line
const buildPath = path.resolve(__dirname, '../build');

module.exports = {
  // debug mode.
  // when set to true, lets you see debugging messages in the console.
  debug: false,

  // By default it creates 'webpack-assets.json' file at
  // webpack_configuration.context (which is your project folder).
  // You can change the assets file path as you wish
  // (therefore changing both folder and filename).
  //
  // (relative to webpack_configuration.context which is your project folder)
  webpack_assets_file_path: `${buildPath}/assets.json`,

  // Be sure to set the resolve alias configurations here
  // so we're aligned with webpack's alias resolution.
  alias,

  // By default, when running in debug mode, it creates 'webpack-stats.json' file at
  // webpack_configuration.context (which is your project folder).
  // You can change the stats file path as you wish
  // (therefore changing both folder and filename).
  //
  // (relative to webpack_configuration.context which is your project folder)
  // webpack_stats_file_path: buildPath + '/webpack-stats.json',

  // Here you can define all your asset types
  assets: {
    // url-loader and file-loader are supported with no additional configuration
    images: {
      extensions: ['jpeg', 'jpg', 'png', 'gif'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },

    // url-loader and file-loader are supported with no additional configuration
    fonts: {
      extensions: ['woff', 'woff2', 'ttf', 'svg'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },

    style_modules: {
      extensions: ['css', 'less', 'scss'],

      // which `module`s to parse CSS from:
      filter(module, regex, options, log) {
        // eslint-disable-line
        if (options.development) {
          // in development mode there's webpack "style-loader",
          // so the module.name is not equal to module.name
          return WebpackIsomorphicToolsPlugin.style_loader_filter(
            module,
            regex,
            options,
            log
          );
        }

        // in production mode there's no webpack "style-loader",
        // so the module.name will be equal to the asset path
        return regex.test(module.name);
      },

      // How to correctly transform `module.name`s
      // into correct asset paths
      path(module, options, log) {
        // eslint-disable-line
        if (options.development) {
          // in development mode there's webpack "style-loader",
          // so the module.name is not equal to module.name
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(
            module,
            options,
            log
          );
        }

        // in production mode there's no webpack "style-loader",
        // so the module.name will be equal to the asset path
        return module.name;
      },

      // How to extract these Webpack `module`s' javascript `source` code.
      // Basically takes `module.source` and modifies its `module.exports` a little.
      parser(module, options, log) {
        // eslint-disable-line
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(
            module,
            options,
            log
          );
        }

        // in production mode there's Extract Text Loader which extracts CSS text away
        return module.source;
      }
    }
  }
};
