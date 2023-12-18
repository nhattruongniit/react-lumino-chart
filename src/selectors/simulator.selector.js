import { createSelector } from 'reselect';

const simulatorState = state => state.simulator;
export const simulatorSelector = createSelector(
  [simulatorState],
  (simulator) => simulator
);
