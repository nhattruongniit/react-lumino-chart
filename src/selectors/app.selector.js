import { createSelector } from 'reselect';

export const isLoadingSelector = createSelector(
  (state) => state.app,
  (app) => app.isLoading,
);

export const loadingMessageSelector = createSelector(
  (state) => state.app,
  (app) => app.loading_message,
);

export const initializedSelector = createSelector(
  (state) => state.app,
  (app) => app.initialized,
);

export const isLauncherOpenSelector = createSelector(
  state => state.app,
  app => app.isLauncherOpen,
);
