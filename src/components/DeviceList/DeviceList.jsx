import React from 'react';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import { yellow } from '@mui/material/colors';
import PropTypes from 'prop-types';

import { DeviceItem } from '@/components';
import { useThemeMode } from '@/hooks';

export const DeviceList = ({ devicesData, pagesQty }) => {
  const { themeMode } = useThemeMode();

  const setBgColor = (mode) => {
    switch (mode) {
      case 'light':
        return `${yellow[700]}`;

      case 'dark':
        return `${yellow[900]}`;

      default:
        return '#fff';
    }
  };

  const setBoxShadowColor = (mode) => {
    switch (mode) {
      case 'light':
        return `0 0 2px ${yellow[900]}`;

      case 'dark':
        return `0 0 2px ${yellow[800]}`;

      default:
        return '#fff';
    }
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
            maxWidth: '20%',
            width: '100%',
            textAlign: 'center'
          }}
        >
          <Typography variant="h3">Week&apos;s logs</Typography>
        </Box>
      </Stack>

      {!devicesData.length ? (
        <Box
          sx={{
            mt: '30px',
            minHeight: '200px',
            textAlign: 'center'
          }}
        >
          <Typography variant="h2">No devices</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            mt: '10px'
          }}
        >
          {devicesData.map((device) => (
            <DeviceItem key={device.unique_number} deviceData={device} />
          ))}
        </Box>
      )}

      {!!pagesQty && pagesQty > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: '10px'
          }}
        >
          <Pagination count={pagesQty} />
        </Box>
      )}
    </>
  );
};

DeviceList.propTypes = {
  devicesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  pagesQty: PropTypes.number
};
