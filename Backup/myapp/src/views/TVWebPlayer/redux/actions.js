import { createAction as actionCreatorFactory } from 'redux-actions';

export const PLAYER_MOUNTED = 'vdk/player/mounted';
export const PLAYER_UNMOUNTED = 'vdk/player/unmounted';

export const onPlayerMounted = actionCreatorFactory(PLAYER_MOUNTED);
export const onPlayerUnmounted = actionCreatorFactory(PLAYER_UNMOUNTED);
