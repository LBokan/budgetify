import React from 'react';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { DeviceItem, NotificationBar } from '@/components';
import { getMaxLogsQty } from '@/helpers';
import { useThemeMode } from '@/hooks';

import {
  setBgColor,
  setBoxShadowColor,
  setContainerWidth,
  setDirectionValue
} from './styles';

export const DeviceList = ({
  devicesData,
  pagesQty,
  chosenPageNumber,
  setOffset,
  isShortView = false
}) => {
  const [notificationBar, setNotificationBar] = React.useState({
    isOpen: false,
    typeOfBar: '',
    text: ''
  });

  const [page, setPage] = React.useState(chosenPageNumber);

  const handleChange = (event, value) => {
    setOffset(value - 1);
    setPage(value);
  };

  const { themeMode } = useThemeMode();
  const maxLogsQty = getMaxLogsQty(devicesData);

  const openSuccessBar = (typeOfAction) => {
    switch (typeOfAction.toLowerCase()) {
      case 'edit':
        setNotificationBar((prevState) => ({
          ...prevState,
          isOpen: true,
          typeOfBar: 'success',
          text: 'Editing of the device was successful'
        }));
        break;

      case 'delete':
        setNotificationBar((prevState) => ({
          ...prevState,
          isOpen: true,
          typeOfBar: 'success',
          text: 'Deletion of the device was successful'
        }));
        break;

      default:
        return;
    }
  };

  const resetNotificationBarData = (isOpen) => {
    setNotificationBar((prevState) => ({
      ...prevState,
      isOpen: isOpen,
      typeOfBar: '',
      text: ''
    }));
  };

  return (
    <>
      <Stack width={setContainerWidth(isShortView)}>
        {!isShortView && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            mt="30px"
            mb="20px"
            p="10px 20px"
            borderRadius="10px"
            bgcolor={setBgColor(themeMode)}
            boxShadow={setBoxShadowColor(themeMode)}
          >
            <Box sx={{ width: '80px', textAlign: 'center' }}>
              <Typography>Image</Typography>
            </Box>

            <Box
              sx={{
                maxWidth: '15%',
                width: '100%',
                textAlign: 'center'
              }}
            >
              <Typography variant="h3">Device name</Typography>
            </Box>

            <Box
              sx={{
                maxWidth: '5%',
                width: '100%',
                textAlign: 'center'
              }}
            >
              <Typography variant="h3">Status</Typography>
            </Box>

            <Box
              sx={{
                maxWidth: '10%',
                width: '100%',
                textAlign: 'center'
              }}
            >
              <Typography variant="h3">Today&apos;s logs</Typography>
            </Box>

            <Box
              sx={{
                maxWidth: '15%',
                width: '100%',
                textAlign: 'center'
              }}
            >
              <Typography variant="h3">Week&apos;s logs</Typography>
            </Box>

            <Box
              sx={{
                maxWidth: '10%',
                width: '100%',
                textAlign: 'center'
              }}
            />
          </Stack>
        )}

        {!devicesData?.length ? (
          <Box
            sx={{
              mt: '30px',
              textAlign: 'center'
            }}
          >
            <Typography variant="h2">No devices</Typography>
          </Box>
        ) : (
          <Stack
            direction={setDirectionValue(isShortView)}
            justifyContent="center"
            flexWrap="wrap"
          >
            {devicesData?.map((device) => (
              <DeviceItem
                key={device.id}
                deviceData={device}
                maxLogsQty={maxLogsQty}
                isShortView={isShortView}
                openSuccessBar={openSuccessBar}
              />
            ))}
          </Stack>
        )}

        {!!pagesQty && pagesQty > 1 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: '10px'
            }}
          >
            <Pagination count={pagesQty} page={page} onChange={handleChange} />
          </Box>
        )}
      </Stack>

      {!!notificationBar.isOpen && (
        <NotificationBar
          text={notificationBar.text}
          typeOfBar={notificationBar.typeOfBar}
          setIsOpenBarOnComplete={resetNotificationBarData}
        />
      )}
    </>
  );
};

DeviceList.propTypes = {
  devicesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  pagesQty: PropTypes.number,
  chosenPageNumber: PropTypes.number,
  setOffset: PropTypes.func,
  isShortView: PropTypes.bool
};
