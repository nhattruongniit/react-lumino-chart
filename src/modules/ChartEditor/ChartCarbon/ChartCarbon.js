import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// configs
import { CHART_TYPE, LINE_CHART_POINT } from 'configs/constant'

// heplers
import { optionChart } from 'helpers';

// components
import { PieCanvasJS } from '../../../components/Chart/PieCanvasJS';
import LineChartCanvasJS from '../../../components/Chart/LineChartCanvasJS';

// selectors
import { currentTabSelector } from 'selectors/tabs.selector';

// components
import SelectedChartType from 'components/SelectedChartType';

const ChartCarbon = () => {
  const currentTab = useSelector(currentTabSelector);
  const chartValues = currentTab?.state?.chartValues || [];
  const chartLabels = currentTab?.state?.labels || {};
  const options = optionChart(currentTab?.chartType, currentTab?.options, chartLabels);

  console.log('ChartCarbon: ', currentTab)

  return (
    <div className="chartCarbon">
      {currentTab?.chartType === '' && (
        <ContainerStyled>
          <SelectedChartType tabId={currentTab.id} />
        </ContainerStyled>
      )}

      {currentTab?.chartType === CHART_TYPE.PIE && (
        <>
        {chartValues.length > 0 ? (
          <div className='w-full h-full flex items-center justify-center'>
            {/* <PieChart 
              key={currentTab.reRenderId}
              options={options}
              chartValues={chartValues}
            /> */}
            <PieCanvasJS 
              options={options}
              chartValues={chartValues}
            />
          </div>
          
        ) : (
          <>Please click Apply ...</>
        )}
          {/* {chartValues.length > 0 ? (
            <PieChart
              reRenderId={currentTab.reRenderId}
              options={options}
              chartValues={chartValues}
            />
          ) : (
            <PieChart
              reRenderId={currentTab.reRenderId}
              options={skeletonOptionPieChart}
              chartValues={chartValues}
            />
          )} */}
        </>

      )}

       {/* {currentTab?.chartType === CHART_TYPE.LINE && currentTab?.chartPoint === LINE_CHART_POINT.DEFAULT && (
        <LineChart
          reRenderId={currentTab.reRenderId}
          options={options}
          chartValues={chartValues}
        />
      )} */}

      {currentTab?.chartType === CHART_TYPE.LINE && currentTab.chartPoint === LINE_CHART_POINT.LARGE_DATA_POINTS && (
        <LineChartCanvasJS
          reRenderId={currentTab.reRenderId}
          chartValues={chartValues}
        />
      )}

    </div>
  );
};

export default ChartCarbon;

const ContainerStyled = styled.div`
  display: ${props => props.isHide ? 'none' : 'block'};
  position: absolute;
  top: 30px;
  left: 20px;
  z-index: 1;
  width: 55%;
}
`
