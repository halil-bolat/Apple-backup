/*
 *** SERVER CONFIGURATIONS ***
 *
 *  Configurations for the Node server.
 */

import env from './env';
import accedoOne from './accedoOne';

const staticPath =
  process.env.STATIC_PATH || (env.isProduction ? 'static' : '../static');

export default {
  // The path to serve static content from.
  staticPath,

  // The host name to use for the Node server
  host: process.env.HOST || 'localhost',

  // The port to start the Node server on
  port: process.env.PORT || 3000,

  // Specifies the default client side assets paths.
  // These will be dynamically created by webpack-isomorphic-tools
  // and provided to the HTML generator in src/server/Html.js
  defaultAssets: {
    javascript: {},
    styles: {
      bundle: `${staticPath}/bundle.css`
    },
    assets: {}
  },

  // Indicates whether server-side rendering should be disabled or not.
  // I.e. if the React component tree should be hydrated server side or
  // only when loaded on the client.
  // Server side rendering helps with SEO and can speed up first load.
  disableSsr: false,

  // If we need an HTTP proxy to use for our client app, it can
  // be configured here. The below will proxy any call to
  // <server-url>/ovp to https://vdk-ovp.ocs.demo.accedo.tv
  //
  // Using a proxy can e.g. be an alternative in dev mode when you're not
  // in control of CORS settings on the server.
  // It can also be necessary if you need to attach confidential information
  // such as API tokens to OVP requests without exposing them to the client.
  //
  // Checkout src/server/middleware/proxy.js for hooking in to the request/response
  // chain of proxy requests.
  proxies: [
    {
      path: '/ovp',
      url: 'https://vdk-ovp.ocs.demo.accedo.tv'
    }
  ],

  // Settings for the server side logger.
  // These will be passed to the server side vdkweb-winston
  // logger in src/utils/logger.js
  logger: {
    // Defines the logging targets that we want to log
    // to whenever we're using the logger.
    transports: [
      // Logging to the console
      {
        name: 'Console',
        enabled: true
      },

      // If we have an Accedo One key configured
      // we'll enable the Accedo One transport.
      {
        name: 'AccedoOne',
        enabled: !!accedoOne.appKey,
        options: {
          level: 'error',
          facilityCode: 90,
          errorCode: '000'
        }
      }
    ]
  }
};
