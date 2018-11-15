import { handleActions } from 'redux-actions';
import { PLAYER_MOUNTED, PLAYER_UNMOUNTED } from './actions';

const initialState = {
  playerIsMounted: false
};

const onPlayerMounted = (state = initialState) => ({
  ...state,
  playerIsMounted: true
});

const onPlayerUnmounted = (state = initialState) => ({
  ...state,
  playerIsMounted: false
});

const reducer = handleActions(
  {
    [PLAYER_MOUNTED]: onPlayerMounted,
    [PLAYER_UNMOUNTED]: onPlayerUnmounted
  },
  initialState
);

export default reducer;
