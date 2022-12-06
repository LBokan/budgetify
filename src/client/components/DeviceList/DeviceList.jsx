import React from 'react';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { DeviceItem } from '@/components';
import { getMaxLogsQty } from '@/helpers';
import { useThemeMode } from '@/hooks';

import { setBgColor, setBoxShadowColor } from './styles';

export const DeviceList = ({
  devicesData,
  pagesQty,
  chosenPageNumber,
  setOffset
}) => {
  const [page, setPage] = React.useState(chosenPageNumber + 1);

  const handleChange = (event, value) => {
    setOffset(value - 1);
    setPage(value);
  };

  const { themeMode } = useThemeMode();
  const maxLogsQty = getMaxLogsQty(devicesData);

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
            <DeviceItem
              key={device.id}
              deviceData={device}
              maxLogsQty={maxLogsQty}
            />
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
          <Pagination count={pagesQty} page={page} onChange={handleChange} />
        </Box>
      )}
    </>
  );
};

DeviceList.propTypes = {
  devicesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  pagesQty: PropTypes.number,
  chosenPageNumber: PropTypes.number,
  setOffset: PropTypes.func
};
