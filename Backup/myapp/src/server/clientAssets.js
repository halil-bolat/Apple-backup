/**
 * Small utility function to get the references to client assets from which the server
 * will know the main JS file to use, image pointers and CSS pointers, etc.
 *
 * It considers if webpackIsomorphicTools is available (i.e. we're running in DEV mode)
 * or if we should fetch the assets from the 'client-assets' module which should be resolved
 * in your Webpack configuration to a valid JSON file via externals:
 *
 * Example webpack configuration:
 *
 * {
 *   ...
 *   externals: [
 *     {
 *       'client-assets': './assets.json'
 *     }
 *     ...
 *   ]
 * }
 * @param {object} defaultAssets The default assets config
 *
 * @returns {object} Assets object
 */
const clientAssets = (
  defaultAssets = {
    javascript: {},
    styles: {},
    assets: {}
  }
) => {
  let assets;

  if (typeof webpackIsomorphicTools !== 'undefined') {
    if (__DEVELOPMENT__) {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      webpackIsomorphicTools.refresh();
    }

    assets = webpackIsomorphicTools.assets();

    if (__DEVELOPMENT__ && assets.javascript && assets.javascript.client) {
      // Make sure we include the vendor DLL bundle among
      // the JavaScript assets.
      assets.javascript.vendor = assets.javascript.client.replace(
        /\/[^/]*\.js/,
        '/vendor.dll.js'
      );
    }
  } else {
    try {
      // In a production build, we won't have access to isomorphic tools
      // so try to fetch the assets from an external source. This would typically be configured
      // in webpack as an 'external' (e.g 'client-assets': './assets.json')
      assets = require('client-assets');
    } catch (err) {
      console.error(
        'Failed to fetch client assets. Have you generated your client code yet?\n Falling back on default assets.\n'
      );
    }
  }

  if (!assets || !assets.javascript) {
    assets = defaultAssets;
  }

  return assets;
};

export default clientAssets;
