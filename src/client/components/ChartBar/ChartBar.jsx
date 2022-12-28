import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ChartBar = ({ data, options = {}, stylesObj = {} }) => {
  return <Bar style={stylesObj} data={data} options={options} />;
};

ChartBar.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object,
  stylesObj: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  )
};
