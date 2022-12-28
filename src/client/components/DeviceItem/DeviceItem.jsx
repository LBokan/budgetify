import React from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { Delete, Edit, ExpandMore } from '@mui/icons-material';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import moment from 'moment';
import PropTypes from 'prop-types';

import { DELETE_DEVICE, EDIT_DEVICE } from '@/api/mutation/device';
import { GET_ALL_DEVICES } from '@/api/query/device';
import { ConfirmationModal, NotificationBar } from '@/components';
import {
  getChartLineDatasetData,
  getCurrentWeekDaysArr,
  getDateToday,
  getDeviceTypeImage
} from '@/helpers';
import { useThemeMode } from '@/hooks';

import { ChartLine } from '../ChartLine';
import { EditDeviceModal } from '../EditDeviceModal';
import { LogsInfoMenu } from '../LogsInfoMenu';

import {
  setBgColor,
  setBoxShadowColor,
  setContainerStyles,
  setGridXChartColor,
  setLineChartColor
} from './styles';

export const DeviceItem = ({ deviceData, maxLogsQty, isShortView = false }) => {
  const [chosenDeviceData, setChosenDeviceData] = React.useState({});
  const [isOpenEditDevice, setIsOpenEditDevice] = React.useState(false);
  const [isOpenDeleteDevice, setIsOpenDeleteDevice] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOpenLogsMenu = Boolean(anchorEl);

  const { themeMode } = useThemeMode();
  const dateToday = getDateToday();

  const client = useApolloClient();

  const [editDevice, { error: errorEditDevice }] = useMutation(EDIT_DEVICE, {
    refetchQueries: [GET_ALL_DEVICES]
  });

  const [deleteDevice, { error: errorDeleteDevice }] = useMutation(
    DELETE_DEVICE,
    {
      refetchQueries: [GET_ALL_DEVICES]
    }
  );

  const todayLogsArr = deviceData?.allDeviceLogs.filter(
    (log) => moment(log.date).format('YYYY-MM-DD') == dateToday
  )[0];

  const dataCharts = {
    labels: getCurrentWeekDaysArr(),
    datasets: [
      {
        label: 'Logs',
        data: getChartLineDatasetData(null, deviceData, true),
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

  const resetCache = () => {
    client.resetStore();
  };

  const handleClickExpandMore = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseExpandMore = () => {
    setAnchorEl(null);
  };

  const openEditDeviceModal = (deviceData) => {
    setChosenDeviceData(deviceData);
    setIsOpenEditDevice(true);
  };

  const openDeleteDeviceModal = (deviceData) => {
    setChosenDeviceData(deviceData);
    setIsOpenDeleteDevice(true);
  };

  const closeEditDeviceModal = () => {
    setIsOpenEditDevice(false);
  };

  const closeDeleteDeviceModal = () => {
    setIsOpenDeleteDevice(false);
  };

  const editDeviceOnSubmit = (data) => {
    editDevice({
      variables: {
        ...chosenDeviceData,
        deviceName: data.deviceName,
        deviceType: data.deviceType,
        isActive: data.isActive
      },
      onCompleted: () => {
        resetCache();
      }
    });
    closeEditDeviceModal();
  };

  const deleteDeviceOnSubmit = () => {
    deleteDevice({
      variables: {
        id: chosenDeviceData.id
      },
      onCompleted: () => {
        resetCache();
      }
    });
    closeDeleteDeviceModal();
  };

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        p="10px 20px"
        borderRadius="10px"
        bgcolor={setBgColor(themeMode)}
        boxShadow={setBoxShadowColor(themeMode)}
        sx={setContainerStyles(isShortView)}
      >
        <Box
          component="img"
          sx={{ width: '80px', height: '80px' }}
          src={getDeviceTypeImage(deviceData?.deviceType)}
          alt="Device image"
        />

        <Box
          sx={{
            maxWidth: `${isShortView ? '100%' : '15%'}`,
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
            maxWidth: `${isShortView ? '100%' : '5%'}`,
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

        {!isShortView && (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: `${isShortView ? '100%' : '10%'}`,
                width: '100%'
              }}
            >
              <Typography variant="h3">
                {todayLogsArr?.totalIssuesCount}
              </Typography>

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
                  onClick={handleClickExpandMore}
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
                maxWidth: '15%',
                width: '100%',
                maxHeight: '120px',
                textAlign: 'center'
              }}
            >
              <ChartLine data={dataCharts} options={optionsCharts} />
            </Box>
          </>
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '10%',
            width: '100%'
          }}
        >
          <IconButton
            color="success"
            sx={{
              ml: '10px',
              width: '35px',
              maxHeight: '35px'
            }}
            onClick={() => openEditDeviceModal(deviceData)}
            aria-label="Edit device"
          >
            <Edit sx={{ width: '100%', height: '100%' }} />
          </IconButton>

          <IconButton
            color="error"
            sx={{
              ml: '10px',
              width: '35px',
              maxHeight: '35px'
            }}
            onClick={() => openDeleteDeviceModal(deviceData)}
            aria-label="Delete device"
          >
            <Delete sx={{ width: '100%', height: '100%' }} />
          </IconButton>
        </Box>
      </Stack>

      {!!errorEditDevice && (
        <NotificationBar text={errorEditDevice.message} typeOfBar="error" />
      )}

      {!!errorDeleteDevice && (
        <NotificationBar text={errorDeleteDevice.message} typeOfBar="error" />
      )}

      <EditDeviceModal
        deviceData={deviceData}
        isOpen={isOpenEditDevice}
        onClose={closeEditDeviceModal}
        onSubmit={editDeviceOnSubmit}
      />

      <ConfirmationModal
        isOpen={isOpenDeleteDevice}
        onClose={closeDeleteDeviceModal}
        onSubmit={deleteDeviceOnSubmit}
        title="Device deletion"
        text="Are you sure you want to delete the device?"
      />

      <LogsInfoMenu
        anchorEl={anchorEl}
        open={isOpenLogsMenu}
        handleClose={handleCloseExpandMore}
        logsData={todayLogsArr}
      />
    </>
  );
};

DeviceItem.propTypes = {
  deviceData: PropTypes.object.isRequired,
  maxLogsQty: PropTypes.number.isRequired,
  isShortView: PropTypes.bool
};
