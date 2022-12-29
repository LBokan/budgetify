import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import PropTypes from 'prop-types';

import 'chart.js/auto';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartDoughnut = ({ data, options = {}, stylesObj = {} }) => {
  return <Doughnut style={stylesObj} data={data} options={options} />;
};

ChartDoughnut.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object,
  stylesObj: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  )
};
