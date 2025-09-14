import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function OrdersChart({ data }) {
  const labels = data.map(d => d.date);
  const values = data.map(d => d.revenue);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: values,
        fill: false,
        tension: 0.1
      }
    ]
  };

  return <div style={{ maxWidth: 800 }}><Line data={chartData} /></div>;
}