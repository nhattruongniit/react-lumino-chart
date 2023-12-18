// libs
import { toast } from 'react-toastify';

// mock data
import { dataVariableLineChart } from 'dataVariableLineChart';

async function prepareChartVariables(getState) {
  const currentTabId = getState().tabs.activeTabId;
  const { 
    plottedVariables: variables
  } = getState().tabs.tabById[currentTabId];

  return {
    variableValues: dataVariableLineChart,
    variables,
  };
}

const mappingDataByHourly = (variables, variableValues) => {
  let result = {};
  const days = {};

  const data = variableValues.flat();
  if (data.length === 0) {
    return {};
  }

  const gData = {};
  const gMap = variables.reduce((hashMap, variableItem) => {
    hashMap[variableItem.id] = variableItem;
    return hashMap;
  }, {});

  for (let i = 0; i < data.length; i++) {
    const gDate = data[i].datetime.split(' ')[0];
    if (!gData[gDate]) {
      days[gDate] = true;
      gData[gDate] = {name: gDate, chartData: {}};
    }
    if (!gData[gDate]['chartData'][data[i].output_variable_id]) {
      gData[gDate]['chartData'][data[i].output_variable_id] = {
        type: "line",
        showInLegend: true,
        name: gMap[data[i].output_variable_id]?.full_name || '',
        markerType: "square",
        xValueFormatString: "DD MMM, YYYY",
        color: gMap[data[i].output_variable_id]?.bgColor || '',
        dataPoints: []
      };
    }
    gData[gDate]['chartData'][data[i].output_variable_id].dataPoints.push({
      label: data[i]?.datetime ? data[i]?.datetime.split(' ')[1] : 'N/A',
      y: Number(Number.parseFloat(data[i].value).toFixed(20)), //Number(data[i].value).toFixed(2)
    })
  }

  result = Object.keys(gData).reduce((cc, ca) => {
    cc[ca] = {
      ...gData[ca],
      chartData: Object.values(gData[ca].chartData)
    }
    return cc;
  }, {})

  return { result, days }
}

function organizeChartData(variables, variableValues) {
  const chartValues = [];
  const labels = {};

  if (variables.length === 0 || variableValues.length === 0 || variableValues[0].length === 0) {
    toast('Not has variables', {
      type: 'error',
    });
    return {
      chartValues,
      labels,
    };
  }

  // labels
  variables.forEach((variable) => {
    labels[variable.full_name] = variable.bgColor;
  });

  const { days, result } = mappingDataByHourly(variables, variableValues);
  Object.keys(days).map(day => chartValues.push(result[day]))

  return {
    labels,
    chartValues,
    days
  };
}

export default async function fetchValuesForLineChartCanvasJS(getState) {
  const { variables, variableValues } = await prepareChartVariables(getState);
  const { labels, chartValues, days } = organizeChartData(variables, variableValues);
  return { labels, chartValues, days };
}
