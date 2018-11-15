/*
 * This file will enable runtime transpilation for using ES6 syntax in node.
 */

const fs = require('fs');

// Read the .babelrc file to configure the Babel runtime properly
const babelrc = fs.readFileSync('./.babelrc');

// Parse it to JSON.
const config = JSON.parse(babelrc);
config.plugins = ['dynamic-import-node'].concat(config.plugins || []);

// This hooks into node's 'require' and automatically compiles files on the fly.
// All subsequent files required by node with the extensions .es6, .es, .jsx and .js will be transformed by Babel.
// WARNING: This should not be used in production.
require('babel-register')(config);
require('babel-polyfill');
