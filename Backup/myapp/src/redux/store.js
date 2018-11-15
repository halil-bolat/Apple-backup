import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { rootReducer } from './reducer';
import analyticsMiddleware from './middleware/analytics';

let initState;
if (typeof window === 'object') {
  initState = window.__data;
} else {
  initState = {};
}

export const configureStore = ({
  historyType,
  initialState = initState,
  services
}) => {
  historyType = historyType || require('#/config/history').appHistory;
  // This is where we collect our Redux middlewares
  // which all our actions will pass.
  const middleware = [
    // The thunk middleware handles thunk actions,
    // typically used for batching actions together and
    // provide async functionality such as making server
    // requests, etc.
    // All thunk actions will get access to our
    // collected services via an extra parameter.
    // Thus we can connect them to any service we want.
    thunkMiddleware.withExtraArgument(services),

    // The promise middleware manages actions which return
    // a promise. It will then handle resolve and reject
    promiseMiddleware,

    analyticsMiddleware,

    // Part of react-router and manages application routing
    routerMiddleware(historyType)
  ];

  const tools = [];

  if (__DEVELOPMENT__) {
    const devToolsExtensionExists =
      typeof window === 'object' &&
      typeof window.devToolsExtension === 'function';

    if (devToolsExtensionExists) {
      tools.push(window.devToolsExtension());
    }
  }

  const finalCreateStore = compose(
    applyMiddleware(...middleware),
    ...tools
  )(createStore);

  const store = finalCreateStore(rootReducer, initialState);

  // Sync the router history
  // https://github.com/reactjs/react-router-redux#history--synchistorywithstorehistory-store-options
  const history = syncHistoryWithStore(historyType, store, {
    adjustUrlOnReplay: true
  });

  // Hot Module Replacement
  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducer', () => {
      const reducer = require('./reducer');

      store.replaceReducer(reducer.rootReducer);
    });
  }

  return {
    store,
    history
  };
};
