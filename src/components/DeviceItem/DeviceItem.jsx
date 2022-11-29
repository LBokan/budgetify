import React from 'react';
import { ExpandMore } from '@mui/icons-material';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { blueGrey, green, grey, red, teal, yellow } from '@mui/material/colors';
import PropTypes from 'prop-types';

import { createWeekLogsQtyArr } from '@/helpers/chartsHelpers';
import { useThemeMode } from '@/hooks';

import { ChartLine } from '../ChartLine';
import { LogsInfoMenu } from '../LogsInfoMenu';

export const DeviceItem = ({ deviceData }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { themeMode } = useThemeMode();
  const dateToday = new Date().toISOString().split('T')[0];

  const weekLogsQtyArr = createWeekLogsQtyArr(deviceData.logs);

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
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: "Week's logs",
        data: weekLogsQtyArr,
        borderWidth: 4,
        borderColor: setLineChartColor(themeMode),
        pointBorderWidth: 0,
        pointBackgroundColor: 'transparent'
      }
    ]
  };

  const optionsCharts = {
    responsive: false,
    events: [],
    scales: {
      y: {
        display: false
      },
      x: {
        border: {
          color: setGridXChartColor(themeMode),
          width: 2
        },
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  const stylesCharts = { width: '100%', height: '50px' };

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
          sx={{ width: '50px', height: '50px' }}
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
            maxWidth: '20%',
            width: '100%',
            maxHeight: '50px',
            textAlign: 'center'
          }}
        >
          <ChartLine
            data={dataCharts}
            options={optionsCharts}
            styles={stylesCharts}
          />
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
