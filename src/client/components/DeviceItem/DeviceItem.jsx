import React from 'react';
import { ExpandMore } from '@mui/icons-material';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import moment from 'moment';
import PropTypes from 'prop-types';

import {
  getCurrentWeekDaysArr,
  getDateToday,
  getDeviceTypeImage
} from '@/helpers';
import { useThemeMode } from '@/hooks';

import { ChartLine } from '../ChartLine';
import { LogsInfoMenu } from '../LogsInfoMenu';

import {
  setBgColor,
  setBoxShadowColor,
  setGridXChartColor,
  setLineChartColor
} from './styles';

export const DeviceItem = ({ deviceData, maxLogsQty }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { themeMode } = useThemeMode();
  const dateToday = getDateToday();

  const todayLogsArr = deviceData?.allDeviceLogs.filter(
    (log) => moment(log.date).format('YYYY-MM-DD') == dateToday
  )[0];

  const dataCharts = {
    labels: getCurrentWeekDaysArr(),
    datasets: [
      {
        label: 'Logs',
        data: deviceData?.currentWeekLogs.map((log) => log.totalIssuesCount),
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
        display: false,
        suggestedMin: 0,
        suggestedMax: maxLogsQty
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
          color: setGridXChartColor(themeMode),
          callback(value, index) {
            return index % 2 === 0
              ? `${moment(this.getLabelForValue(value)).format('MM/DD')}`
              : '';
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
          src={getDeviceTypeImage(deviceData?.deviceType)}
          alt="Device image"
        />

        <Box
          sx={{
            maxWidth: '15%',
            width: '100%'
          }}
        >
          {deviceData?.deviceName.length > 20 ? (
            <>
              <Tooltip
                title={deviceData?.deviceName}
                sx={{ cursor: 'pointer' }}
              >
                <Typography variant="h3">
                  {`${deviceData?.deviceName.slice(0, 20)}...`}
                </Typography>
              </Tooltip>
              <Typography variant="subtitle1" sx={{ mt: '5px' }}>
                {deviceData.deviceType}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h3">{deviceData?.deviceName}</Typography>
              <Typography variant="subtitle1" sx={{ mt: '5px' }}>
                {deviceData.deviceType}
              </Typography>
            </>
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
            sx={{ color: deviceData?.isActive ? green[700] : red[900] }}
          >
            {deviceData?.isActive ? 'Active' : 'Inactive'}
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
          <Typography variant="h3">{todayLogsArr?.totalIssuesCount}</Typography>

          {!!todayLogsArr?.totalIssuesCount && (
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
        logsData={todayLogsArr}
      />
    </>
  );
};

DeviceItem.propTypes = {
  deviceData: PropTypes.object.isRequired,
  maxLogsQty: PropTypes.number.isRequired
};
