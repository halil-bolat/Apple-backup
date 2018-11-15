import { handleActions } from 'redux-actions';
import * as reduxHelper from '../../utils/reduxHelper';
import { REQUEST, RECEIVE, INVALIDATE } from './actions';

const isUndefined = value => typeof value === 'undefined';

const requestConfig = (state, action) => {
  const key = action.payload;

  if (isUndefined(key)) {
    return reduxHelper.applyRequestInfo(state);
  }

  const data = key ? state[key] : state;

  const newState = {
    ...state,
    [key]: reduxHelper.applyRequestInfo(data)
  };

  return newState;
};

const receiveConfigError = (state, action) => {
  const { error, __key } = action.payload;

  if (isUndefined(__key)) {
    return reduxHelper.applyErrorInfo(state);
  }

  const newState = {
    ...state,
    [__key]: reduxHelper.applyErrorInfo({ content: error })
  };

  return newState;
};

const receiveConfig = (state, action) => {
  const { content, __key } = action.payload;
  if (isUndefined(__key)) {
    return {
      ...reduxHelper.applyReceiveInfo(state),
      content
    };
  }

  const newState = {
    ...state,
    [__key]: reduxHelper.applyReceiveInfo({ content })
  };

  return newState;
};

const invalidateConfig = (state, action) => {
  const key = action.payload;

  if (isUndefined(key)) {
    return reduxHelper.applyInvalidationInfo(state);
  }

  const data = key ? state[key] : state;

  const newState = {
    ...state,
    [key]: reduxHelper.applyInvalidationInfo(data)
  };

  return newState;
};

const reducer = handleActions(
  {
    [REQUEST]: requestConfig,
    [RECEIVE]: {
      next: receiveConfig,
      throw: receiveConfigError
    },
    [INVALIDATE]: invalidateConfig
  },
  {}
);

export default reducer;
