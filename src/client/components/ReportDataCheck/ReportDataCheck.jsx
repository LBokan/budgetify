import React from 'react';
import { Close, Done } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import PropTypes from 'prop-types';

import { useThemeMode } from '@/hooks';

import { setBgColor } from './styles';

export const ReportDataCheck = ({ filtersData }) => {
  const { themeMode } = useThemeMode();

  return (
    <Stack
      alignItems="center"
      justifyContent="flex-start"
      spacing={2}
      mt="40px"
      mx="auto"
      p="40px"
      width="80%"
      height="50vh"
      bgcolor={setBgColor(themeMode)}
      borderRadius="10px"
    >
      <Typography variant="h2">
        To create the report, set the next values:
      </Typography>

      <Stack direction="row" alignItems="center" justifyContent="center">
        {((!!filtersData.deviceNames.length ||
          !!filtersData.deviceTypes.length) && (
          <Done sx={{ width: '25px', height: '25px', color: green[700] }} />
        )) || <Close sx={{ width: '25px', height: '25px', color: red[900] }} />}

        <Typography variant="h4" sx={{ ml: '5px' }}>
          Choose &apos;Name of device&apos; or(and) &apos;Type of device&apos;
          option(-s)
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="center">
        {(!!filtersData.deviceStatuses.length && (
          <Done sx={{ width: '25px', height: '25px', color: green[700] }} />
        )) || <Close sx={{ width: '25px', height: '25px', color: red[900] }} />}

        <Typography variant="h4" sx={{ ml: '5px' }}>
          Choose &apos;Status of device&apos; option(-s)
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="center">
        {(!!filtersData.dateStart && (
          <Done sx={{ width: '25px', height: '25px', color: green[700] }} />
        )) || <Close sx={{ width: '25px', height: '25px', color: red[900] }} />}

        <Typography variant="h4" sx={{ ml: '5px' }}>
          Choose &apos;Date start&apos; option
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="center">
        {(!!filtersData.dateEnd && (
          <Done sx={{ width: '25px', height: '25px', color: green[700] }} />
        )) || <Close sx={{ width: '25px', height: '25px', color: red[900] }} />}

        <Typography variant="h4" sx={{ ml: '5px' }}>
          Choose &apos;Date end&apos; option
        </Typography>
      </Stack>
    </Stack>
  );
};

ReportDataCheck.propTypes = {
  filtersData: PropTypes.shape({
    deviceNames: PropTypes.arrayOf(PropTypes.string),
    deviceTypes: PropTypes.arrayOf(PropTypes.string),
    deviceStatuses: PropTypes.arrayOf(PropTypes.string),
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string
  }).isRequired
};
