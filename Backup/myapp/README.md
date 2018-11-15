# Accedo Build Web Viki

A web site in [React](https://facebook.github.io/react/)/[Redux](http://redux.js.org/)/[ES6](http://es6-features.org/) using [Babel](https://babeljs.io/) for JS transpilation, [Webpack](https://webpack.github.io/) for module bundling. Linting with [ESLint](https://eslint.org/), tests with [Jest](https://facebook.github.io/jest/), [SASS](http://sass-lang.com/) for styling and [Prettier](https://github.com/prettier/prettier) for automatic code formatting.

## Get started with VDK

Follow this tutorial to get up to speed:

-   https://accedobroadband.jira.com/wiki/spaces/VDKWEB/pages/168100346/Get+Started

## Install and Run

Install dependencies:

```
$ npm install
```

Start the app in development mode:

```
$ npm start
```

## Build Production package

Generate a .tar.bz2 package with the Node server, client JS and static assets.
The package is created in a generated 'dist' folder.

```
$ npm run package
```

## Build static Production package

Generate a .tar.bz2 package without a Node server, including only a static index.html page referencing the client JS and static assets.
The package is created in a generated 'dist' folder.

```
$ npm run package:static
```

## Run Tests

Jest is used for running tests. All tests are defined in the `src/__tests__` directory and Jest will automatically pick them up from there when new ones are added.

Run your tests:

    $ npm test

Jest will by default run in watch mode, which means that it will keep running and watch your files for changes. When any change is discovered, it will re-run the tests affected by the changes made. This is good for TDD and seeing your tests pass when updating your code.

If you only want to run your test suite once, e.g. from Jenkins, you can do this with the following command:

    $ npm run test:once

## Folder Structure

    viki
    |- helpers
    |	 |- # Helper files for e.g. generating prod package.json or starting dev servers
    |- src
    |	 |- # Main code folder
    |  |- __tests__
    |  |  |- # All unit tests
    |  |- client
    |  |  |- # Client side entry
    |  |- components
    |  |  |- # Stateless 'dumb' presentational components
    |  |- containers
    |  |  |- # Stateful 'smart' components
    |  |- redux
    |  |  |- # Redux modules and store configurations
    |  |- routing
    |  |  |- # Routes
    |  |- server
    |  |  |- # Server side entry and middleware
    |  |- services
    |  |  |- # Collected services
    |  |- static
    |  |  |- # Static files such as images, icons
    |  |- theme
    |  |  |- # Style content, SASS files
    |- webpack
    |	 |- # Webpack configurations for DEV and PROD
    |- <build>
    |	 |- # Generated folder containing compiled code
    |- <dist>
    |   |- # Generated folder containing packaged archives
    |- <coverage>
    |   |- # Generated folder containing code coverage information (after running 'npm test')
    |- <node_modules>
       |_ # Generated folder where all NPM dependencies will be downloaded

## Code Conventions

ESLint together with Prettier is used for managing code style conventions. Checkout .eslintrc to see which rules apply.

## Module Aliases

In order to use friendly import paths for modules and files, the application is configured with path aliases.
These aliases can be found in `webpack/alias.js` and typically allow us to use import paths like this:

```javascript
import config from '#/config';
```

instead of keeping track of the relative path from the file you're importing to, like:

```javascript
import config from '../../../config';
```

It also allows us to quickly replace a module or an entire directory with another one, simply by changing the target of the alias.

The aliases are configured through Webpack's `resolve.alias` option. For server side rendering to pick them up, they also need to be set in the Isomorphic tools configuration through the `alias` property (see `webpack/isomorphic-tools.js`).

To be able to use the aliases in Node modules which are not included in the Webpack dependency chain, e.g. helpers or Webpack configuration files, we need to configure these separately. This is done with the `module-alias` NPM package. Simply import the file `./helpers/registerAliases.js` and it will prepare the aliases for you.

For Jest to pick up these aliases, they need to be configured via the `jest.moduleNameMapper` object.

Also if you're using VSCode for development, expecting autosuggest for imports, you'll need to configure your `jsconfig.json` file with these aliases as well.

For testing SonarQube locally, you can use: https://hub.docker.com/_/sonarqube/
