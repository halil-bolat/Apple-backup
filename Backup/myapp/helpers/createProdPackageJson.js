/*
 * Generates a PROD package.json file for the compiled server package.
 *
 * This package only needs to have a 'start' command and don't need
 * to be aware of any devDependencies or repository information.
 *
 * It's basically copying the existing package.json you're using for
 * your app, makes the changes mentioned above and writes it to a new
 * package.json file in the build target folder.
 *
 * Used in the build process.
 */

const fs = require('fs');
const path = require('path');
const forEach = require('lodash/forEach');
const includes = require('lodash/includes');
const packageJson = require('../package.json');

const buildPath = path.resolve(__dirname, '../build');

console.log('\nCreating a production package.json file.');

// List the props you want deleted from
// the final package.json.
const deleteProps = ['devDependencies', 'repository', 'jest', 'pre-commit'];

// Delete undesired props
deleteProps.forEach(prop => {
  console.log('  Deleting property: ', prop);
  delete packageJson[prop];
});

// The production package only need to know how it should be started
// so we're only providing the 'npm start' command.
packageJson.scripts = {
  start: 'node server.js'
};

// Remove all VDK specific dependencies since they should be
// baked into the server bundle created by Webpack.
const prodDependencies = {};
forEach(packageJson.dependencies, (version, name) => {
  if (!includes(name, 'vdk')) {
    prodDependencies[name] = version;
  } else {
    console.log('  Removing dependency', name, version);
  }
});

// Replace the dependencies with the updated list where
// the VDK packages have been removed.
packageJson.dependencies = prodDependencies;

// Save the file in the build target folder.
fs.writeFileSync(
  `${buildPath}/package.json`,
  JSON.stringify(packageJson, null, 2)
);

console.log(`Package.json file created at ${buildPath}/package.json\n`);
