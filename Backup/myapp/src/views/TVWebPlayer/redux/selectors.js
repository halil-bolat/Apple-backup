let rootSelector = state => state;

export const setRootSelector = selector => {
  rootSelector = selector;
};

export const getPlayerMountedState = state =>
  rootSelector(state).playerIsMounted;
