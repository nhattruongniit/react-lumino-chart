import { createSelector } from 'reselect';

export const activePageSelector = createSelector(
  (state) => state.chartValues,
  (chartValues) => chartValues.activePage,
);

export const showModalSaveChartSelector =  createSelector(
  (state) => state.chartValues,
  (chartValues) => chartValues.showModalSaveChart,
);
