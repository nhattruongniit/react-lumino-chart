import { createSelector } from 'reselect';

export const tabByIdSelector = (state) => state.tabs.tabById;
export const tabArraySelector = (state) => state.tabs.tabArray;
export const activeTabIdSelector = (state) => state.tabs.activeTabId;

export const tabsSelector = createSelector(tabByIdSelector, tabArraySelector, (tabById, tabArray) => tabArray.map((id) => tabById[id]));

export const currentTabSelector = createSelector(tabsSelector, activeTabIdSelector, (tabs, activeTabId) => {
  const res = tabs.find(tab => Number(tab.id) === Number(activeTabId))
  return res
});

export const chartOptionTabSelector = createSelector(tabByIdSelector, activeTabIdSelector, (tabById, activeTabId) => {
  const { state, ...rest } =  tabById[activeTabId];
  return {
    ...rest
  }
});
