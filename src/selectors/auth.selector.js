import { createSelector } from 'reselect';

export const userSelector = createSelector(
  (state) => state.auth,
  (auth) => auth.user,
);

export const errorAuthSelector = createSelector(
  (state) => state.auth,
  (auth) => auth.error,
);
