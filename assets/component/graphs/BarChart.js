import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';

let BarChart = ({ dataSet }) => {
  const data = {
    labels: ['pH (log)'],
    datasets: [
      {
        label:'Ph In',
        data: [dataSet.in],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1
      },
      {
        label:'Ph Out',
        data: [dataSet.out],
        backgroundColor: 'rgba(89,234,117,0.4)',
        borderColor: 'rgb(8,225,0)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis : 'y',
    scales: {
      x: {
        beginAtZero: true,
        max: 14
      },
      y: {
        beginAtZero: true,
        max: 14,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <div style={{ height: '100px' }}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChart;