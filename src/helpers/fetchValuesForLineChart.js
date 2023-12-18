// libs
import { toast } from 'react-toastify';

// mock data
import { dataVariableLineChart } from 'mocks/mockData';

async function prepareChartVariables(getState) {
  const currentTabId = getState().tabs.activeTabId;
  const { plottedVariables: variables } = getState().tabs.tabById[currentTabId];
  const variableValues = [...dataVariableLineChart];

  return {
    variableValues,
    variables,
  };
}

const mappingDataByHourly = (variables, variableValues) => {
  const results = {}
  const days = {};

  const variablesHash = variables.reduce((hash, variable) => {
    hash[variable.id] = variable.full_name;
    return hash;
  }, {});

  if (variableValues.length === 0) {
    return {};
  }

  // code new
  const listData = variableValues.flat();
  if (listData.length === 0) {
    return {
      days,
      results
    }
  }

  listData.forEach(data => {
    const date = data.datetime.split(' ')[0];
    if(!results[date]) {
      days[date] = true;
      results[date] = {
        name: date,
        chartData: []
      }
    }
    results[date].chartData.push({
      date: data.datetime,
      group: variablesHash[data.output_variable_id],
      value: Number(data.value)
    })
  })

  console.log('mappingDataByHourly: ', {
    variables,
    variableValues,
    variablesHash,
    listData,
    results
  })

  return {
    days,
    results
  }
}

function organizeChartData(variables, variableValues) {
  const chartValues = [];
  const labels = {};

  if (variables.length === 0) {
    toast('Please choose variables', {
      type: 'error',
    });
    return {
      chartValues,
      labels,
    };
  } else if (variableValues.length === 0 || variableValues[0].length === 0) {
    toast('Please choose another date', {
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

  const { days, results } = mappingDataByHourly(variables, variableValues);

  Object.keys(days).map(day => chartValues.push(results[day]))

  return {
    labels,
    chartValues,
    days
  };
}

export default async function fetchValuesForLineChart(getState) {
  const { variables, variableValues } = await prepareChartVariables(getState);
  const { labels, chartValues, days } = organizeChartData(variables, variableValues);
  return { labels, chartValues, days };
}
