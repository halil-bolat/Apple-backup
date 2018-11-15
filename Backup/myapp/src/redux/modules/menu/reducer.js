import { handleActions } from 'redux-actions';
import { TOGGLE_MENU, COLLAPSE_MENU } from './actions';

/**
 * The initial state if no state is provided.
 * @type {Object}
 */
const initialState = {
  isCollapsed: true
};

const toggleMenu = (state = initialState) => {
  return {
    ...state,
    isCollapsed: !state.isCollapsed
  };
};

const collapseMenu = (state = initialState) => {
  return {
    ...state,
    isCollapsed: true
  };
};

const reducer = handleActions(
  {
    [TOGGLE_MENU]: toggleMenu,
    [COLLAPSE_MENU]: collapseMenu
  },
  initialState
);

export default reducer;
