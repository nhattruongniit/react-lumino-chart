import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';

// components
import SelectPage from 'modules/ChartEditor/ChartCarbon/components/SelectPage';

// selectors
import { activePageSelector } from 'selectors/chartValues.selector';

// actions
import { setActivePage } from 'reducer/chartValues.reducer';

export function LineRechart({ chartValues, tabItem }) {
  const dispatch = useDispatch();
  const activePage = useSelector(activePageSelector);
  const labels = tabItem.state.labels;

  const handleActivePage = (number) => {
    dispatch(setActivePage(number));
  };

  const chartValuesLineChart = (chartValues && chartValues[activePage].chartData) || [];
  const dataLine =  chartValuesLineChart.reduce((acc, cur) => {
    cur.dataPoints.forEach((dataPoint) => {
      const { label, y, name } = dataPoint
      const index = acc.findIndex((item) => item.name === label)
      if (index === -1) {
        acc.push({
          name: label,
          [name]: y
        })
      } else {
        acc[index][name] = y
      }
    })
    return acc
  }, []);

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={300}
          height={300}
          data={dataLine}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(labels).map((key) => (
            <Line key={key} type="monotone" dataKey={key} stroke={labels[key]} />
          ))}
          {/* <Line type="monotone" dataKey="270,1" stroke="#8884d8" />
          <Line type="monotone" dataKey="269,1,ZN_1_FLR_1" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>

      <div className="pagination">
        <SelectPage pages={chartValues.map(item => item.name)} activePage={activePage} setActivePage={handleActivePage} />
      </div>
    </>
  )
}
