import { CHART_TYPE } from "configs/constant";

export default function optionChart(chartType, chartOptionTab, chartLabels) {
  let options = {
    legend: {
      alignment: 'center',
      enabled: chartOptionTab.legend,
    },
    tooltip: {
      enabled: chartOptionTab.tooltip,
      showTotal: chartOptionTab.tooltip,
    },
    height: '500px',
  };

  switch (chartType) {
    case CHART_TYPE.PIE: {
      options = {
        ...options,
        pie: {
          alignment: 'center',
        },

        color: {
          scale: {
            ...chartLabels,
          },
        },
      };
      break;
    }
    case CHART_TYPE.LINE: {
      options = {
        ...options,
        axes: {
          bottom: {
            mapsTo: 'date',
            scaleType: 'time',
          },
          left: {
            mapsTo: 'value',
            scaleType: 'linear',
          },
        },
        color: {
          scale: {
            ...chartLabels,
          },
        },
        curve: 'curveMonotoneX',
      };
      break;
    }
    default:
      break;
  }

  return options;
}
