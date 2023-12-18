import React from 'react';
import styled from 'styled-components';
import canvg from 'canvg';
import { useDispatch, useSelector } from 'react-redux';

// configs
import { LINE_CHART_POINT } from 'configs/constant';

// components
import FluentCheckbox from 'components/Checkbox/FluentCheckbox';

// actions
import { setTabOption } from 'reducer/tabs.reducer';

// selectors
import { currentTabSelector } from 'selectors/tabs.selector';

function downloadChart() {
  const chart = document.querySelector('.recharts-wrapper');
  if (!chart) return;
  const chartHtml = chart.innerHTML;
  const canvasElement = document.createElement('canvas');
  canvasElement.id = 'canvas';
  document.getElementById('root').appendChild(canvasElement);
  canvg('canvas', chartHtml);
  const link = document.createElement('a');
  link.download = 'chart.png';
  link.href = canvasElement.toDataURL('image/png');
  link.click();
  setTimeout(() => {
    canvasElement.remove();
  });
}

const TabItemPopover = ({ tabId, options }) => {
  const dispatch = useDispatch();
  const currentTab = useSelector(currentTabSelector);

  function toggleLegend(e) {
    e.stopPropagation();
    dispatch(setTabOption(tabId, 'legend', !options.legend));
  }

  function toggleTooltip(e) {
    e.stopPropagation();
    dispatch(setTabOption(tabId, 'tooltip', !options.tooltip));
  }

  function renderLegend() {
    if(currentTab.type === 'line' && chartPoint.chartPoint === LINE_CHART_POINT.LARGE_DATA_POINTS) {
      return null;
    } else {
      return (
        <MenuItem>
          <FluentCheckbox 
            label="Legend"
            id={`toggle-chart-legend-${tabId}`}
            checked={options.legend}
            onChange={toggleLegend}
          />
        </MenuItem>
      )
    }
  }

  return (
    <>
      <MenuItem>Send to View...</MenuItem>
      <MenuItem onClick={downloadChart}>Export...</MenuItem>
      <Separator />
      <MenuItem>
        <FluentCheckbox 
          label="Tooltip"
          id={`toggle-chart-tooltip-${tabId}`}
          checked={options.tooltip}
          onChange={toggleTooltip}
        />
      </MenuItem>
      {renderLegend()}
    </>
  );
};

export default TabItemPopover;

const MenuItem = styled.div`
  padding: 7px 15px;
`;

const Separator = styled.div`
  height: 1px;
  margin: 5px 0;
  background: rgba(0, 0, 0, 0.1);
`;
