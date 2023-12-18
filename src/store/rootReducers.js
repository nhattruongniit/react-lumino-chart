import { combineReducers } from 'redux';

// reducers
import appReducer from 'reducer/app.reducer';
import authReducer from 'reducer/auth.reducer';
import variablesReducer from 'reducer/variables.reducer';
import tabsReducer from 'reducer/tabs.reducer';
import chartValuesReducer from 'reducer/chartValues.reducer';
import simulatorReducer from 'reducer/simulator.reducer';

const reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  variables: variablesReducer,
  tabs: tabsReducer,
  chartValues: chartValuesReducer,
  simulator: simulatorReducer,
});

export default reducers;
