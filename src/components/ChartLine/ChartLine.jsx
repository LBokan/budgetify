import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.register(
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
);

export const ChartLine = ({ data, options = {}, stylesObj = {} }) => {
  return <Line style={stylesObj} data={data} options={options} />;
};

ChartLine.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object,
  styles: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  )
};
