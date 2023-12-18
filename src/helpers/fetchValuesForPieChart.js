import isNumber from 'lodash/isNumber';

import { plottedVariables as mockPlottedVariables } from 'mocks/mockData';

function findMatchingVariableValue(dateTime, variableValues = []) {
  return variableValues.find((variableValue) => {
    const { month, date, hour, minute } = dateTime;
    const variableDate = new Date(variableValue.datetime);
    const matchingDate = new Date(
      variableDate.getFullYear(),
      isNumber(month) ? Number(month) - 1 : variableDate.getMonth(),
      isNumber(date) ? Number(date) - 1 : variableDate.getDate(),
      isNumber(hour) ? Number(hour) - 1 : variableDate.getHours(),
      isNumber(minute) ? Number(minute) - 1 : variableDate.getMinutes(),
      0,
      0,
    );
    return variableDate.getTime() === matchingDate.getTime();
  });
}

export default async function fetchValuesForPieChart(getState) {

  const currentTabId = getState().tabs.activeTabId;
  const { plottedVariables, month, date, hour, minute } = getState().tabs.tabById[currentTabId];
  const dateTime = { month, date, hour, minute };

  if (!plottedVariables || plottedVariables.length <= 0) {
    return {
      chartValues: [],
      labels: {},
    };
  }
  const chartData = [];
  const labels = {};

  const newPlottedVariables = mockPlottedVariables;

  // type simple
  newPlottedVariables.forEach((variable, variableIndex) => {
    const variableValue = findMatchingVariableValue(dateTime, variable.variableValues);
    if (variableValue) {
      // for rechart
      chartData.push({
        name: variable.full_name,
        value: Number(variableValue.value),
        color: variable.bgColor,
      });
      // for canvasjs
      // chartData.push({
      //   name: variable.full_name,
      //   y: Number(variableValue.value),
      //   color: variable.bgColor,
      // });

      // for highchart
      // chartData.push({
      //   name: variable.full_name,
      //   y: Number(variableValue.value),
      // });
      // labels[variable.full_name] = variable.bgColor;
    }
  });

  return {
    chartValues: chartData,
    labels,
  };
}
