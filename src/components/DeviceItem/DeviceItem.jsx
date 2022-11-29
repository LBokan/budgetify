import React from 'react';
import { ExpandMore } from '@mui/icons-material';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { blueGrey, green, grey, red, teal, yellow } from '@mui/material/colors';
import moment from 'moment';
import PropTypes from 'prop-types';

import { getDateToday } from '@/helpers/chartsHelpers';
import { useThemeMode } from '@/hooks';

import { ChartLine } from '../ChartLine';
import { LogsInfoMenu } from '../LogsInfoMenu';

export const DeviceItem = ({ deviceData }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { themeMode } = useThemeMode();
  const dateToday = getDateToday();

  const todayLogsArr = deviceData.logs.filter(
    (log) => log.date == dateToday
  )[0];

  const setBgColor = (mode) => {
    switch (mode) {
      case 'light':
        return `${grey[50]}`;

      case 'dark':
        return `${blueGrey[900]}`;

      default:
        return '#fff';
    }
  };

  const setBoxShadowColor = (mode) => {
    switch (mode) {
      case 'light':
        return `0 0 2px ${grey[300]}`;

      case 'dark':
        return `0 0 2px ${blueGrey[700]}`;

      default:
        return '#fff';
    }
  };

  const setLineChartColor = (mode) => {
    switch (mode) {
      case 'light':
        return yellow[700];

      case 'dark':
        return yellow[900];

      default:
        return '#000';
    }
  };

  const setGridXChartColor = (mode) => {
    switch (mode) {
      case 'light':
        return teal[900];

      case 'dark':
        return grey[50];

      default:
        return '#fff';
    }
  };

  const dataCharts = {
    labels: deviceData.logs.map((log) => moment(log.date).format('YYYY-MM-DD')),
    datasets: [
      {
        label: 'Logs',
        data: deviceData.logs.map((log) => log.logs.total_count),
        borderWidth: 2,
        borderColor: setLineChartColor(themeMode),
        pointBorderWidth: 1,
        pointBackgroundColor: 'transparent'
      }
    ]
  };

  const optionsCharts = {
    scales: {
      y: {
        display: false
      },
      x: {
        border: {
          color: setGridXChartColor(themeMode),
          width: 1
        },
        grid: {
          display: false
        },
        ticks: {
          callback(value) {
            return `${moment(this.getLabelForValue(value)).format('MM/DD')}`;
          }
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
        mt="10px"
        p="10px 20px"
        borderRadius="10px"
        bgcolor={setBgColor(themeMode)}
        boxShadow={setBoxShadowColor(themeMode)}
      >
        <Box
          component="img"
          sx={{ width: '80px', height: '80px' }}
          src={deviceData.device_image}
          alt="Device image"
        />

        <Box
          sx={{
            maxWidth: '15%',
            width: '100%'
          }}
        >
          {deviceData.device_name.length > 20 ? (
            <Tooltip title={deviceData.device_name} sx={{ cursor: 'pointer' }}>
              <Typography variant="h3">
                {`${deviceData.device_name.slice(0, 20)}...`}
              </Typography>
            </Tooltip>
          ) : (
            <Typography variant="h3">{deviceData.device_name}</Typography>
          )}
        </Box>

        <Box
          sx={{
            maxWidth: '5%',
            width: '100%',
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: deviceData.active ? green[700] : red[900] }}
          >
            {deviceData.active ? 'Active' : 'Inactive'}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '10%',
            width: '100%'
          }}
        >
          <Typography variant="h3">{todayLogsArr.logs.total_count}</Typography>

          {!!todayLogsArr.logs.total_count && (
            <IconButton
              sx={{
                ml: '10px',
                p: 0,
                width: '20px',
                height: '20px'
              }}
              id="logs-button"
              aria-controls={open ? 'logs-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              aria-label="Show more"
            >
              <ExpandMore sx={{ width: '100%', height: '100%' }} />
            </IconButton>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '20%',
            width: '100%',
            maxHeight: '120px',
            textAlign: 'center'
          }}
        >
          <ChartLine data={dataCharts} options={optionsCharts} />
        </Box>
      </Stack>

      <LogsInfoMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        logsData={todayLogsArr.logs}
      />
    </>
  );
};

DeviceItem.propTypes = {
  deviceData: PropTypes.object.isRequired
};
