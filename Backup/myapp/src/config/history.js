import { BrowserRouter, HashRouter } from 'react-router-dom';

import createBrowserHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory';

let appHistory;
let Router;

if (
  typeof __HISTORY_TYPE__ !== 'undefined' &&
  __HISTORY_TYPE__ === 'hashHistory'
) {
  appHistory = createHashHistory();
  Router = HashRouter;
} else if (typeof window === 'object') {
  appHistory = createBrowserHistory();
  Router = BrowserRouter;
}

export default {
  appHistory,
  Router
};
