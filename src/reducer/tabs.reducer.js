import _ from 'lodash';
import moment from 'moment';
import { toast } from 'react-toastify';

// mock data
import { mockTabs } from 'mocks/mockTabs';

// configs
import * as CONSTANTS from 'configs/constant';

// helpers
import { fetchValuesForPieChart, fetchValuesForLineChart, fetchValuesForLineChartCanvasJS, randomText } from 'helpers';

// redux
import { setLoading } from 'reducer/app.reducer';

// TYPES
const ADD_TAB = 'TABS/ADD_TAB';
const CLOSE_TAB = 'TABS/CLOSE_TAB';
const SAVE_STATE_DATA = 'TABS/SAVE_STATE_DATA';
const SET_ACTIVE_TAB = 'TABS/SET_ACTIVE_TAB';
const SET_TAB_OPTION = 'TABS/SET_TAB_OPTION';
const SET_TAB_CHART_TYPE = 'TABS/SET_TAB_CHART_TYPE';
const SET_PLOTTED_VARIABLE = 'TABS/SET_PLOTTED_VARIABLE';
const SET_DATE_TIMEFRAME = 'TABS/SET_DATE_TIMEFRAME';
const SET_DATE_LINE_CHART = 'TABS/SET_DATE_LINE_CHART';
const SET_DATE_PIE_CHART = 'TABS/SET_DATE_PIE_CHART';
const LOAD_CHART_DATA = 'TABS/LOAD_CHART_DATA';
const SELECT_TAB_CHART = 'TABS/SELECT_TAB_CHART';
const REMOVE_TAB_CHART = 'TABS/REMOVE_TAB_CHART';

export const RESTORE_STATE = 'TABS/RESTORE_STATE';

const DEFAULT_TAB_ID = 999;

// ACTIONS
export function selectTabChart(chartId) {
  return {
    type: SELECT_TAB_CHART,
    payload: chartId
  }
}

export function removeTabChart(chartId) {
  return {
    type: REMOVE_TAB_CHART,
    payload: chartId
  }
}

export function setTabChartType(tabId, chartType) {
  return {
    type: SET_TAB_CHART_TYPE,
    payload: { tabId, chartType }
  };
}

export function setDateTimeFrame(timeframe) {
  return {
    type: SET_DATE_TIMEFRAME,
    payload: { timeframe, tabId: DEFAULT_TAB_ID }
  };
}

export const addTab = () => (dispatch, getState) => {
  const timeframe = getState().simulator?.timeframe || [];
  dispatch({ type: ADD_TAB, payload: { timeframe } });
};

export const switchTab = (tabId) => (dispatch) => {
  dispatch({ type: SET_ACTIVE_TAB, payload: { tabId } });
};

export const closeTab = (tabId) => (dispatch, getState) => {
  let nextActiveTabId = null;
  const tabIndex = getState().tabs.tabArray.indexOf(tabId);
  if (tabIndex > 0) {
    nextActiveTabId = getState().tabs.tabArray[tabIndex - 1];
  }

  if (!nextActiveTabId) return;

  const nextTab = getState().tabs.tabById[nextActiveTabId];

  dispatch({ type: SET_ACTIVE_TAB, payload: { tabId: nextActiveTabId } });
  dispatch({ type: CLOSE_TAB, payload: { tabId } });
  dispatch({ type: RESTORE_STATE, payload: nextTab.state || {} });
};

export const saveTabData = payload => (dispatch, getState) => {
  const activeTabId = getState().tabs.activeTabId;
  dispatch({
    type: SAVE_STATE_DATA,
    payload: {
      tabId: activeTabId,
      data: payload
    }
  });
}

export function setTabOption(tabId, optionName, value) {
  return {
    type: SET_TAB_OPTION,
    payload: { tabId, optionName, value },
  };
}

export function setPlottedVariable(tabId, plotted, selectedPlotted) {
  return {
    type: SET_PLOTTED_VARIABLE,
    payload: { tabId, plotted, selectedPlotted }
  };
}

export function setDateLineChart(fieldName, value, tabId) {
  return {
    type: SET_DATE_LINE_CHART,
    payload: {
      fieldName,
      value,
      tabId
    },
  };
}

export function setDatePieChart(fieldName, value, tabId) {
  return {
    type: SET_DATE_PIE_CHART,
    payload: {
      fieldName,
      value,
      tabId
    },
  };
}

export const submitForm = (chartType) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const currentTabId = getState().tabs.activeTabId;
  const { plottedVariables, chartPoint } = getState().tabs.tabById[currentTabId];

  let fetchValuesFn;

  if (plottedVariables && plottedVariables.length === 0) {
    toast('Selected variables must have same type', {
      type: 'error',
    });
    dispatch(setLoading(false));
    return;
  }

  switch (chartType) {
    case CONSTANTS.CHART_TYPE.PIE: {
      fetchValuesFn = fetchValuesForPieChart;
      break;
    }
    case CONSTANTS.CHART_TYPE.LINE: {
      if(chartPoint === CONSTANTS.LINE_CHART_POINT.DEFAULT) {
        fetchValuesFn = fetchValuesForLineChart;
      } else if (chartPoint === CONSTANTS.LINE_CHART_POINT.LARGE_DATA_POINTS) {
        fetchValuesFn = fetchValuesForLineChartCanvasJS;
      }
      break;
    }
    default:
      break;
  }

  if (typeof fetchValuesFn !== 'function') return;

  const payload = await fetchValuesFn(getState);
  dispatch(setLoading(false));
  dispatch(saveTabData(payload))
};

export const saveChart = () => async (_, getState) => {
  const {
    tabs: {
      tabById
    }
  } = getState();

  const data = JSON.parse(JSON.stringify(tabById));
  Object.keys(data).forEach(keysTab => {
    delete data[keysTab].state
  })

  toast('Save chart successfully!', {
    type: 'success',
    autoClose: 3000,
  });
};

export const loadChartData = () => (dispatch, getState) => {
  const state = getState();
  if(!state) return;

  dispatch({
    type: LOAD_CHART_DATA,
    payload: {
      tabs: state
    }
  })
}

const stateDefaultChart = {
  chartType: '',
  chartPoint: CONSTANTS.LINE_CHART_POINT.LARGE_DATA_POINTS,
  state: {},
  plottedVariables: [],
  selectedPlottedVariable: {},
  options: {
    legend: true,
    tooltip: true,
  },
  startDate: '',
  endDate: '',
  maximumDatePoints: CONSTANTS.CHART_FORM_POINTS[0],
  steps: CONSTANTS.CHART_FORM_STEPS[0],
  maxDate: '',
  minDate: '',
  date: '',
  month: '',
  hour: '',
  minute: '',
}

// REDUCER
const initialState = {
  // tabArray: [DEFAULT_TAB_ID],
  tabArray: [],
  activeTabId: DEFAULT_TAB_ID,
  tabById: {
    [DEFAULT_TAB_ID]: {
      id: DEFAULT_TAB_ID,
      name: 'Tab 1',
      reRenderId: 1, // use to reRender,
      ...stateDefaultChart,
    },
  },
};

if(process.env.REACT_APP_ENV === 'localhost') {
  initialState.activeTabId = mockTabs.activeTabId;
  initialState.tabById = mockTabs.tabById;
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SELECT_TAB_CHART: {
      return {
        ...state,
        tabArray: [...state.tabArray, payload],
      }
    }
    case REMOVE_TAB_CHART: {
      return {
        ...state,
        tabArray: state.tabArray.filter(item => item !== payload),
      }
    }
    case ADD_TAB: {
      const id = Math.floor(Math.random() * 10000);
      const name = `Tab_${id}`;
      const { timeframe } = payload;
      return {
        ...state,
        activeTabId: id,
        tabArray: [...state.tabArray, id],
        tabById: {
          ...state.tabById,
          [id]: {
            id,
            name,
            reRenderId: Date.now(),
            ...stateDefaultChart,
            startDate: timeframe.length > 0 ? new Date(timeframe[0].startDate) : '',
            endDate: timeframe.length > 0 ? new Date(timeframe[timeframe.length - 1].endDate) : '',
            minDate: timeframe.length > 0 ? moment(timeframe[0].startDate).format('DD/MM/YYYY') : '',
            maxDate: timeframe.length > 0 ? moment(timeframe[timeframe.length - 1].endDate).format('DD/MM/YYYY') : '',
          },
        },
        renderedChart: {
          ...state.renderedChart,
          [id]: false
        }
      };
    }
    case SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTabId: payload.tabId,
      };
    }
    case CLOSE_TAB: {
      const { tabId } = payload;
      delete state.tabById[tabId];

      return {
        ...state,
        tabArray: state.tabArray.filter((id) => id !== tabId),
        tabById: { ...state.tabById },
      };
    }
    case SET_TAB_OPTION: {
      const { tabId, optionName, value } = payload;
      return {
        ...state,
        tabById: {
          ...state.tabById,
          [tabId]: {
            ...state.tabById[tabId],
            reRenderId: Date.now(),
            options: {
              ...state.tabById[tabId].options,
              [optionName]: value,
            },
          },
        },
      };
    }
    case SAVE_STATE_DATA: {
      const { tabId, data } = payload;
      return {
        ...state,
        tabById: {
          ...state.tabById,
          [tabId]: {
            ...state.tabById[tabId],
            reRenderId: Date.now(),
            state: data,
          },
        },
      };
    }
    case SET_TAB_CHART_TYPE: {
      const { tabId, chartType } = payload;
      return {
        ...state,
        tabById: {
          ...state.tabById,
         [tabId]: {
            ...state.tabById[tabId],
            chartType
         }
        }
      }
    }
    case SET_PLOTTED_VARIABLE: {
      const { tabId, plotted, selectedPlotted } = payload;
      return {
        ...state,
        tabById: {
          ...state.tabById,
          [tabId]: {
            ...state.tabById[tabId],
            plottedVariables: plotted,
            selectedPlottedVariable: selectedPlotted
          }
        }
      };
    }
    case SET_DATE_TIMEFRAME: {
      const { timeframe, tabId } = payload;
      return {
        ...state,
        tabById: {
          ...state.tabById,
          [tabId]: {
            ...state.tabById[tabId],
            // startDate: (payload.chartValues && payload.chartValues.startDate && moment(payload.chartValues.startDate).format('YYYY/MM/DD')) || new Date(timeframe[0].startDate),
            // endDate: (payload.chartValues && payload.chartValues.endDate && moment(payload.chartValues.endDate).format('YYYY/MM/DD')) || new Date(timeframe[timeframe.length - 1].endDate),
            startDate: timeframe.length > 0 ? new Date(timeframe[0].startDate) : '',
            endDate:  timeframe.length > 0 ? new Date(timeframe[timeframe.length - 1].endDate) : '',
            minDate: timeframe.length > 0 ? moment(timeframe[0].startDate).format('DD/MM/YYYY') : '',
            maxDate: timeframe.length > 0 ? moment(timeframe[timeframe.length - 1].endDate).format('DD/MM/YYYY') : '',
          }
        }
      }
    }
    case SET_DATE_LINE_CHART: {
      const {  fieldName, value, tabId } = payload;
      return {
        ...state,
        tabById: {
          ...state.tabById,
          [tabId]: {
            ...state.tabById[tabId],
            [fieldName]: value
          }
        }
      }
    }
    case SET_DATE_PIE_CHART: {
      const {  fieldName, value, tabId } = payload;
      return {
        ...state,
        tabById: {
          ...state.tabById,
          [tabId]: {
            ...state.tabById[tabId],
            [fieldName]: value
          }
        }
      }
    }
    case LOAD_CHART_DATA: {
      const { tabs } = payload;
      const tabArray = Object.keys(tabs).map(key => Number(key));

      return {
        ...state,
        tabArray,
        activeTabId: tabArray[0],
        tabById: tabs
      }
    }
    default:
      return state;
  }
}
