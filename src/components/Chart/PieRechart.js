import React from 'react';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
  // const radius = 25 + innerRadius + (outerRadius - innerRadius);
  // const x = cx + radius * Math.cos(-midAngle * RADIAN);
  // const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const radiusPercent = innerRadius + (outerRadius - innerRadius) * 0.5;
  const xPercent = cx + radiusPercent * Math.cos(-midAngle * RADIAN);
  const yPerecent = cy + radiusPercent * Math.sin(-midAngle * RADIAN);
  
  return (
    <>
      {/* <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor="end"
        dominantBaseline="central"
      >
        {name} 
      </text> */}

      <text x={xPercent} y={yPerecent} fill="white" textAnchor={xPercent > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </>
  );
};

export function PieRechart({ chartValues = [] }) {
  const COLORS = chartValues.map(item => item.color);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={300} height={300}>
        <Pie
          data={chartValues}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {chartValues.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
}