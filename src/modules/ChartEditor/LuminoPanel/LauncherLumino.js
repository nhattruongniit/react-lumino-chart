import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataPie24Regular, ArrowTrendingLines24Regular } from '@fluentui/react-icons';

// selectors
import { tabByIdSelector, tabArraySelector } from 'selectors/tabs.selector';

// actions
import { selectTabChart } from 'reducer/tabs.reducer';

// configs
import { CHART_TYPE } from 'configs/constant';

function LauncherLumino() {
  const dispatch = useDispatch();
  const tabById= useSelector(tabByIdSelector);
  const tabArray = useSelector(tabArraySelector);

  function handleSelectChart(chartId) {
    dispatch(selectTabChart(Number(chartId)))
  }

  const { listPieChart, listLineChart, otherChart } = React.useMemo(() => {
    let listPieChart = [];
    let listLineChart = [];
    let otherChart = [];

    if(Object.keys(tabById).length === 0) return { listPieChart, listLineChart, otherChart };

    listPieChart = Object.values(tabById).filter(item => item.chartType === CHART_TYPE.PIE);
    listLineChart = Object.values(tabById).filter(item => item.chartType === CHART_TYPE.LINE);
    otherChart = Object.values(tabById).filter(item => !item.chartType );

    return {
      listPieChart,
      listLineChart,
      otherChart
    }
  }, [tabById]);

  return (
    <div className='launcher_body'>
      <div className='launcher_content'>
        <div className='launcher_row'>
          <div className='launcher_header'>
            <DataPie24Regular /> 
            <span>Pie Chart</span>
          </div>
          <div className='launcher_section'>
            {listPieChart.map(chart => (
              <div 
                key={chart.id} 
                className={`launcher_card ${tabArray.includes(chart.id) ? 'launcher_card-open' : ''}`} 
                onClick={tabArray.includes(chart.id) ? () => {} : () => handleSelectChart(chart.id)}
              >
                <div className='launcher_card_img'>
                  <DataPie24Regular color="#000" style={{ width: '60%', height: '60%' }} /> 
                </div>
                <span className='launcher_card_title'>{chart.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='launcher_row'>
          <div className='launcher_header'>
            <ArrowTrendingLines24Regular /> 
            <span>Line Chart</span>
          </div>
          <div className='launcher_section'>
            {listLineChart.map(chart => (
              <div 
                key={chart.id} 
                className={`launcher_card ${tabArray.includes(chart.id) ? 'launcher_card-open' : ''}`} 
                onClick={tabArray.includes(chart.id) ? () => {} : () => handleSelectChart(chart.id)}
              >
                <div className='launcher_card_img'>
                  <ArrowTrendingLines24Regular color="#000" style={{ width: '60%', height: '60%' }} /> 
                </div>
                <span className='launcher_card_title'>{chart.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='launcher_row'>
          <div className='launcher_header'>
            <ArrowTrendingLines24Regular /> 
            <span>Other Chart</span>
          </div>
          <div className='launcher_section'>
            {otherChart.map(chart => (
              <div 
                key={chart.id} 
                className={`launcher_card ${tabArray.includes(chart.id) ? 'launcher_card-open' : ''}`} 
                onClick={tabArray.includes(chart.id) ? () => {} : () => handleSelectChart(chart.id)}
              >
                <div className='launcher_card_img'>
                  <DataPie24Regular color="#000" style={{ width: '60%', height: '60%' }} /> 
                </div>
                <span className='launcher_card_title'>{chart.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LauncherLumino