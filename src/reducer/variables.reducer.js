import chroma from 'chroma-js';

// helpers
import { setPlottedVariable } from './tabs.reducer';

// run mockData
import { APP_MOCK_DATA, APP_ENV } from '../App';

// TYPES
const FETCH_VARIABLES_SUCCESS = 'VARIABLES/FETCH_VARIABLES_SUCCESS';
const SET_UNITS = 'VARIABLES/SET_UNITS';
const SET_FITLER_VARIABLE = 'VARIABLES/SET_FITLER_VARIABLE';
const RESET_FILTER_VARIABLE = 'VARIABLES/RESET_FILTER_VARIABLE';

export const setFilter = (type, value) => (dispatch) => {
  dispatch({
    type: SET_FITLER_VARIABLE,
    payload: {
      type,
      value,
    },
  });
};

export const resetFilter = () => (dispatch) => {
  dispatch({ type: RESET_FILTER_VARIABLE });
};

export const togglePlottedVariable = (variableId) => (dispatch, getState) => {
  const currentTabId = getState().tabs.activeTabId;
  const { plottedVariables, selectedPlottedVariable} = getState().tabs.tabById[currentTabId];
  const { variables } = getState().variables; // real data variable
  const variable = variables.filter((item) => item.id === variableId)[0];

  let newPlotted = [...plottedVariables];
  let newSelectedPlotted = { ...selectedPlottedVariable };
  const isExists = newPlotted.findIndex((item) => item.id === variableId);

  if (isExists >= 0) {
    newPlotted.splice(isExists, 1);
    delete newSelectedPlotted[variableId];
  } else {
    newPlotted = [
      ...newPlotted,
      {
        ...variable,
        bgColor: chroma.random().hex(),
      },
    ];
    newSelectedPlotted = {
      ...selectedPlottedVariable,
      [variableId]: true,
    };
  }
  dispatch(setPlottedVariable(currentTabId, newPlotted, newSelectedPlotted));
};

// reducer
let defaultVariables = APP_ENV === 'localhost' ? APP_MOCK_DATA.variables : []; // real data variable

const initialState = {
  variables: APP_ENV === 'localhost' ? APP_MOCK_DATA.variables : [], // real data variable
  units: [],
  filter: {},
  plottedType: 'single',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_VARIABLES_SUCCESS: {
      defaultVariables = payload;
      return {
        ...state,
        variables: payload,
      };
    }
    case SET_UNITS: {
      return {
        ...state,
        units: payload.units,
      };
    }
    case SET_FITLER_VARIABLE: {
      const variables = defaultVariables.filter((variable) => {
        let match = true;
        if (payload.type === 'step' && variable.type.toLowerCase() !== payload.value.toLowerCase()) {
          match = false;
        }
        if (payload.type === 'units' && variable.units.toLowerCase() !== payload.value.toLowerCase()) {
          match = false;
        }
        if (payload.type === 'keyword' && variable.full_name.toLowerCase().indexOf(payload.value.toLowerCase()) === -1) {
          match = false;
        }
        return match;
      });

      return {
        ...state,
        variables,
        filter: {
          ...state.filter,
          [payload.type]: payload.value,
        },
      };
    }
    case RESET_FILTER_VARIABLE: {
      return {
        ...state,
        variables: defaultVariables,
      };
    }
    default:
      return state;
  }
};

export default reducer;
