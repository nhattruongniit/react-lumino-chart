import React from 'react'
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// configs
import { CHART_TYPE, LINE_CHART_POINT } from 'configs/constant';

// heplers
// import { optionChart } from 'helpers';

// components
import SelectedChartType from 'components/SelectedChartType';
// import { PieCanvasJS } from 'components/Chart/PieCanvasJS';
// import LineChartCanvasJS from 'components/Chart/LineChartCanvasJS';
import { PieRechart } from 'components/Chart/PieRechart';
import { LineRechart } from 'components/Chart/LineRechart';

function ChartLumino({ tabItem }) {
  if(!tabItem) return <>No chart</>;

  // const options = optionChart(tabItem.chartType, tabItem.options, tabItem.state.labels);
  const chartValues = tabItem.state.chartValues || [];

  return (
    <div className="chartLumino">
      {tabItem.chartType === '' && (
        <ContainerStyled>
          <SelectedChartType tabId={tabItem.id} />
        </ContainerStyled>
      )}

      {tabItem.chartType === CHART_TYPE.PIE && (
        <>
          {chartValues.length > 0 ? (
            <div className='w-full h-full flex items-center justify-center'>
              {/* <PieCanvasJS 
                options={options}
                chartValues={chartValues}
              /> */}
              <PieRechart 
                chartValues={chartValues}
              />
            </div>
            
          ) : (
            <>Please click Apply ...</>
          )}
        </>
      )}

      {tabItem.chartType === CHART_TYPE.LINE && tabItem.chartPoint === LINE_CHART_POINT.LARGE_DATA_POINTS && (
        // <LineChartCanvasJS
        //   // reRenderId={tabItem.reRenderId}
        //   chartValues={chartValues}
        // />
        <LineRechart chartValues={chartValues} tabItem={tabItem} />
      )}
    </div>
  )
}

export default ChartLumino;

const ContainerStyled = styled.div`
  display: ${props => props.isHide ? 'none' : 'block'};
  position: absolute;
  top: 30px;
  left: 20px;
  z-index: 1;
  width: 55%;
}
`
