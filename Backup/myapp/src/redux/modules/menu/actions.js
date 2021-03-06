import { createAction as actionCreatorFactory } from 'redux-actions';

export const TOGGLE_MENU = 'vdk/menu/TOGGLE_MENU';
export const COLLAPSE_MENU = 'vdk/menu/COLLAPSE_MENU';

export const toggleMenu = actionCreatorFactory(TOGGLE_MENU);
export const collapseMenu = actionCreatorFactory(COLLAPSE_MENU);
