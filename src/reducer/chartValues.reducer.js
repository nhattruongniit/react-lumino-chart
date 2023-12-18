
//run mockData
// import { dataLineChartFinal } from 'mockData';

import { RESTORE_STATE } from './tabs.reducer';

// TYPES
const SET_ACTIVE_PAGE = 'CHART_VALUES/SET_ACTIVE_PAGE';
const SET_SAVE_CHART_MODAL_VISIBILITY = 'CHART/SET_SAVE_CHART_MODAL_VISIBILITY';

// ACTIONS
export const setSaveChartModalVisibility = isShow => ({
  type: SET_SAVE_CHART_MODAL_VISIBILITY,
  payload: isShow
})

export function setActivePage(activePage) {
  return {
    type: SET_ACTIVE_PAGE,
    payload: {
      activePage,
    },
  };
}

// REDUCERS
const initialState = {
  activePage: 0,
  showModalSaveChart: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {



    case SET_ACTIVE_PAGE: {
      return {
        ...state,
        activePage: payload.activePage,
      };
    }

    case SET_SAVE_CHART_MODAL_VISIBILITY: {
      return {
        ...state,
        showModalSaveChart: payload,
      };
    }

    case RESTORE_STATE: {
      if (payload.chartValues) return payload.chartValues;
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
