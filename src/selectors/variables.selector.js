import { createSelector } from 'reselect';

export const variablesSelector = createSelector(
  (state) => state.variables,
  (variables) => variables.variables,
);

export const unitsSelector = createSelector(
  (state) => state.variables,
  (variables) => variables.units,
);

export const filterSelector = createSelector(
  (state) => state.variables,
  (variables) => variables.filter,
);
