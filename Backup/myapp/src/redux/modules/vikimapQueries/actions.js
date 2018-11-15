import { createAction } from 'redux-actions';
import selectors from './selectors';
import { shouldFetchData } from '../../utils/reduxHelper';

export const REQUEST = 'app/REQUEST_QUERY_DATA';
export const RECEIVE = 'app/RECEIVE_QUERY_DATA';
export const INVALIDATE = 'app/INVALIDATE_QUERY_DATA';

const onReceive = (services, query) => {
  return services.queryParser
    .executeQuery(query)
    .then(result => {
      return { __key: query, content: result };
    })
    .catch(error => {
      // eslint-disable-next-line no-throw-literal
      throw { __key: query, error };
    });
};

const receiveConfig = createAction(RECEIVE, onReceive);
const requestConfig = createAction(REQUEST);
const invalidateConfig = createAction(INVALIDATE);

/**
 * Thunk action for getting data asynchronously.
 * First checks the data we already have in state to
 * evaluate if we actually need to fetch any new data.
 *
 * If found that the data we have is valid, we'll simply
 * resolve immediately without dispatching any actions.
 *
 * If found that we don't have any data yet or the data we
 * have is invalid, we'll first dispatch a REQUEST action
 * to notify that the request has started. Then we'll
 * dispatch a RECEIVE action. We pass the available services
 * and the key informatio to the receive action which will
 * make the actual service request and typically return
 * a promise to be resolved with the data from the service
 * call.
 *
 * To use this action, you'll need to configure redux-thunk
 * and redux-promise as middlewares in your Redux store, to be
 * able to handle thunk actions and promise payloads.
 *
 * @param  {object} key                If we're fetching information based on a
 *                                     key, it will be specified here.
 * @param  {function} onShouldFetch)   For overriding the data validation mechanism
 *                                     deciding if we should fetch data or not.
 * @return {Promise}                   A promise that will be resolved when the action
 *                                     is done.
 */
const getData = (key, onShouldFetch) => (dispatch, getState, services) => {
  // Try getting the data from the state to begin with
  const data = selectors.getData(getState(), key);

  // What do we advise to do judging by the data we already have in state?
  const shouldFetchDataAdvise = shouldFetchData(data);

  // Verify if the data we found in the state is still valid
  // or if we need to fetch new data
  if (onShouldFetch && !onShouldFetch(data, key, shouldFetchDataAdvise)) {
    return Promise.resolve();
  } else if (!shouldFetchDataAdvise) {
    return Promise.resolve();
  }

  // Notify that the request is in progress
  dispatch(requestConfig(key));

  // Launch the request
  return dispatch(receiveConfig(services, key));
};

const retry = key => (dispatch, getState, services) => {
  // Invalidate the query data, then try requesting it again.
  dispatch(invalidateConfig(key));

  return getData(key)(dispatch, getState, services);
};

const invalidate = key => dispatch => {
  // Invalidate the query data, then try requesting it again.
  return dispatch(invalidateConfig(key));
};

export default {
  getData,
  retry,
  invalidate
};
