import React from 'react';
import ReactDOM from 'react-dom/server';
import { RouterContext } from 'react-router-dom';
import createHistory from 'history/createMemoryHistory';
import { matchRoutes } from 'react-router-config';

import { configureStore } from '#/redux/store';
import App from '#/containers/App/App';
import routes from '#/config/routes';
import modules from '#/redux/modules';
import logger from '#/utils/logger';
import { getServerServices } from '#/services';
import Html from '../Html';

/**
 * This renders the root App component, just as from app.js, but with
 * the provided RouterContext as the content property. The RouterContext
 * will make sure the sub components are rendered properly based on
 * the active route.
 *
 * @param  {ReduxStore} store     The Redux store
 * @param  {Object} renderProps   Render properties that can be provided to the RouterContext
 * @return {Object}               The application React component
 */
const getRootComponent = (store, renderProps) => {
  const content = <RouterContext {...renderProps} />;
  return <App store={store} content={content} />;
};

/**
 * When rendering the application server side, it's not enough to render the App component.
 * We also need to create the surrounding HTML.
 *
 * @param  {ReduxStore} store     The Redux store
 * @param  {Object} renderProps   Render properties that can be provided to the RouterContext
 * @param  {Object} assets        Client side assets references
 * @return {String}               The entire HTML document as a string
 */
const renderHtml = (store, renderProps, assets) => {
  const component = renderProps ? getRootComponent(store, renderProps) : null;

  const html = ReactDOM.renderToString(
    <Html assets={assets} component={component} store={store} />
  );

  return `<!doctype html>\n${html}`;
};

/**
 * Renders and sends a non-hydrated HTML for the client
 * to perform the hydration itself.
 *
 * @param  {ReduxStore} store     The Redux store
 * @param  {Object} res           The HTTP Response object
 * @param  {Object} assets        Client side assets references
 * @return {void}
 */
const hydrateOnClient = (store, res, assets) => {
  const html = renderHtml(store, null, assets);
  res.send(html);
};

/**
 * The exposed middleware for performing the server side rendering of the application.
 * I.e. generating and returning the application HTML with a hydrated state.
 *
 * @param  {Object} assets         Client side assets references
 * @param  {boolean} disableSsr    If server side rendering should be disabled
 * @return {function}              The middleware which is using the provided assets.
 */
const renderApp = (assets, disableSsr) => (req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const memoryHistory = createHistory(req.originalUrl);

  const { store } = configureStore({
    historyType: memoryHistory,
    initialState: undefined,
    services: getServerServices(req)
  });

  if (disableSsr) {
    hydrateOnClient(store, res, assets);
    return;
  }

  global.navigator = {
    userAgent: req.headers['user-agent']
  };

  const getBasicSsrInfo = () => {
    const { status, config, vikimap } = modules;

    const bindDispatch = fn => (...args) => store.dispatch(fn(...args));

    const getStatus = bindDispatch(status.actions.getData);
    const getConfig = bindDispatch(config.actions.getData);
    const getMenu = bindDispatch(vikimap.actions.fetchMenu);

    return getStatus()
      .then(() => getConfig())
      .then(({ payload }) => getMenu(payload.content.vikimap.mainMenuId));
  };

  const branches = matchRoutes(routes, req.url);

  const branchDataPromises = branches.map(({ route, match }) => {
    return route.component.fetchData instanceof Function
      ? route.component.fetchData({ params: match.params, store })
      : null;
  });

  return getBasicSsrInfo().then(() => {
    return Promise.all(branchDataPromises)
      .then(() => {
        const html = renderHtml(store, null, assets);
        res.status(200);
        res.send(html);
      })
      .catch(err => {
        logger.warn(err);
      });
  });
};

export default renderApp;
