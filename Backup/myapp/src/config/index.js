// Using 'require' calls here because this is used by the node server
// which will be run without Babel transpilation and thus not be
// able to understand import/export commands.

// Retrieving the NPM configuration to be able to expose
// it to the client. Can be useful for displaying the
// application version number.
//
// NOTE: be careful to only expose what you need the
// client to see.
import npmConfig from '~/package.json';
import env from './env';
import app from './app';
import server from './server';
import accedoOne from './accedoOne';

/*
 * Exporting the aggregated configurations.
 */
export default {
  npmConfig,
  server,
  app,
  accedoOne,
  env
};
