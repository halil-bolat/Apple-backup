#!/usr/bin/env node

/*
 * A helper for starting and keeping the Node server running
 * for development.
 *
 * It will also provide the information received from
 * webpack-isomorphic-tools to the Node server so it would
 * know how to render the client assets properly when creating
 * the HTML to return to the client.
 */

// Babel registration (runtime transpilation for node)
require('./registerBabel');
require('./registerAliases');

const path = require('path');

const rootDir = path.resolve(__dirname, '..');

/**
 * Define some global constants.
 */
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
global.__CLIENT__ = false;
global.__TV__ = process.env.DEV_ENV === 'tv';

// If in dev mode we'll restart the server when detecting file changes
if (__DEVELOPMENT__) {
  require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json|\.scss$)/i
  });
}

// Checkout https://github.com/halt-hammerzeit/webpack-isomorphic-tools to understand
// how webpack-isomorphic-tools works.
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(
  require('../webpack/isomorphic-tools')
).server(rootDir, () => {
  require('#/server/server');
});
