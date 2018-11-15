require('../../helpers/registerBabel');
require('../../helpers/registerAliases');

const path = require('path');
const { configureServer } = require('./webpack-dev-server');

const config = require('#/config').server;

const port = Number(config.port) + 1;
const host = process.env.DEV_VM_MODE === 'true' ? 'localhost' : config.host;

const devServer = configureServer(
  {
    port,
    host
  },
  require('./dev-config')
);

// Serve the Vendor DLL bundle
devServer.get(/vendor\.dll\.js/, (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '../dll/vendor.dll.js')));
});

// Start the server
devServer.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    console.info(
      '==> 🚧  Webpack development server listening on port %s',
      port
    );
  }
});
