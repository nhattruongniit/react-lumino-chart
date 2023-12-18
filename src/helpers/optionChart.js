import { CHART_TYPE } from "configs/constant";

export default function optionChart(chartType, chartOptionTab, chartLabels) {
  let options = {
    legend: {
      enabled: chartOptionTab?.legend || true,
    },
    tooltip: {
      enabled: chartOptionTab?.toolti || true,
    },
  };

  switch (chartType) {
    case CHART_TYPE.PIE: {
      options = {
        ...options,
        color: Object.values(chartLabels),
      };
      break;
    }
    case CHART_TYPE.LINE: {
      options = {
        ...options,
       
      };
      break;
    }
    default:
      break;
  }

  return options;
}
