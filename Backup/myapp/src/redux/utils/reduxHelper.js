/**
 * Apply appropriate flags for an object that
 * has just been received in an asynchronous
 * redux action flow.
 *
 *  The following flags will be added:
 * __isFetching: false
 * __didInvalidate: false
 * __isError: false
 *
 * @param  {object} obj The object to extend with receive information
 * @return {object}     A new object with the extra information
 */
export const applyReceiveInfo = obj => {
  return {
    ...obj,
    __isFetching: false,
    __didInvalidate: false,
    __isError: false
  };
};

/**
 * Apply appropriate flags for an object that
 * has just been requested in an asynchronous
 * redux action flow
 *
 *  The following flags will be added:
 * __isFetching: true
 * __didInvalidate: false
 * __isError: false
 *
 * @param  {object} obj The object to extend with request information
 * @return {object}     A new object with the extra information
 */
export const applyRequestInfo = obj => {
  return {
    ...obj,
    __isFetching: true,
    __didInvalidate: false,
    __isError: false
  };
};

/**
 * Apply appropriate flags for an object that
 * has just failed to be requested in an asynchronous
 * redux action flow
 *
 *  The following flags will be added:
 * __isFetching: false
 * __didInvalidate: false
 * __isError: true
 *
 * @param  {object} obj The object to extend with error information
 * @return {object}     A new object with the extra information
 */
export const applyErrorInfo = obj => {
  return {
    ...obj,
    __isFetching: false,
    __didInvalidate: false,
    __isError: true
  };
};

/**
 * Apply appropriate flags for an object that
 * has just been invalidated in an asynchronous
 * redux action flow
 *
 *  The following flags will be added:
 * __didInvalidate: true
 *
 * @param  {object} obj The object to extend with invalidation information
 * @return {object}     A new object with the extra information
 */
export const applyInvalidationInfo = obj => {
  return {
    ...obj,
    __didInvalidate: true
  };
};

/**
 * Checks if we are allowed to fetch data
 * based on the data we already have.
 *
 * - If we don't have any data yet, we can go ahead
 * and fetch.
 * - If the data already is in 'fetching' state (__isFetching) we don't
 * want to fetch new data.
 * - If the data has been invalidated (__didInvalidate) we
 * can discard the data we have and fetch new.
 * - Otherwise we'll keep the data we have and don't fetch
 *
 * @param  {object} data   The data to evaluate
 * @return {boolean}       Whether  the data should be fetch or not
 */
export const shouldFetchData = data => {
  // If we didn't find any data in state
  // we should fetch.
  if (!data || typeof data.__isFetching === 'undefined') {
    return true;
  }

  // If we're already fetching data with this ID
  // we should hold off.
  if (data.__isFetching) {
    return false;
  }

  // If the data object has been invalidated we should fetch
  // a new one, otherwise use the one we have
  if (data.__didInvalidate) {
    return true;
  }

  return false;
};
