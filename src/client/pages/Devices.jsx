import React from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { ArrowDownward, ArrowUpward, Close, Sort } from '@mui/icons-material';
import { Box, Button, IconButton, Stack } from '@mui/material';

import { CREATE_DEVICE } from '@/api/mutation/device';
import { GET_ALL_DEVICES } from '@/api/query/device';
import {
  CreateDeviceModal,
  DeviceList,
  FiltersDevices,
  InformationPiece,
  NotificationBar,
  ProgressBar
} from '@/components';
import { getQtyOfPages } from '@/helpers';

export const Devices = () => {
  const [sortByName, setSortByName] = React.useState({
    isActive: false,
    isIncreasing: false
  });
  const [filters, setFilters] = React.useState({
    deviceName: '',
    deviceTypes: [],
    deviceStatuses: []
  });
  const [isOpenCreateDevice, setIsOpenCreateDevice] = React.useState(false);

  const [offset, setOffset] = React.useState(0);
  const limitPerPage = 8;

  const client = useApolloClient();

  const {
    loading: loadingDevicesData,
    error: errorDevicesData,
    data: { getAllDevices: devicesData } = { getAllDevices: {} }
  } = useQuery(GET_ALL_DEVICES, {
    variables: {
      offset,
      limit: limitPerPage,
      sortByName: sortByName.isActive,
      isSortDescending: !sortByName.isIncreasing,
      filterByName: filters.deviceName,
      filterByType: filters.deviceTypes,
      filterByStatus: filters.deviceStatuses
    }
  });

  const [
    createDevice,
    { loading: loadingCreateDevice, error: errorCreateDevice }
  ] = useMutation(CREATE_DEVICE, { refetchQueries: [GET_ALL_DEVICES] });

  const sortByNameOnClick = () => {
    setSortByName({
      isActive: true,
      isIncreasing: !sortByName.isIncreasing
    });
  };

  const resetSortOnClick = () => {
    setSortByName({
      isActive: false,
      isIncreasing: false
    });
  };

  const openCreateDeviceModal = () => {
    setIsOpenCreateDevice(true);
  };

  const closeCreateDeviceModal = () => {
    setIsOpenCreateDevice(false);
  };

  const createDeviceOnSubmit = (data) => {
    createDevice({
      variables: {
        deviceName: data.deviceName,
        deviceType: data.deviceType,
        isActive: data.isActive
      },
      onCompleted: () => {
        client.resetStore();
      }
    });
    closeCreateDeviceModal();
  };

  return (
    <>
      <FiltersDevices filtersData={filters} setFiltersOnChange={setFilters} />

      {!!devicesData && (
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-around"
          mt="30px"
        >
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            spacing={3}
            mr="10px"
          >
            <Box sx={{ position: 'relative', width: '100%' }}>
              {sortByName.isActive && (
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '-40px',
                    width: '30px',
                    height: '30px',
                    transform: 'translate(0, -50%)'
                  }}
                  onClick={resetSortOnClick}
                  aria-label="Reset sort"
                >
                  <Close />
                </IconButton>
              )}

              <Button
                variant={sortByName.isActive ? 'contained' : 'text'}
                sx={{ width: '100%', height: '45px' }}
                startIcon={
                  !sortByName.isActive ? (
                    <Sort />
                  ) : sortByName.isIncreasing ? (
                    <ArrowDownward />
                  ) : (
                    <ArrowUpward />
                  )
                }
                onClick={sortByNameOnClick}
              >
                Sort by name
              </Button>
            </Box>

            <InformationPiece
              title="Total devices:"
              text={`${devicesData?.total_count}`}
              isLoading={loadingDevicesData}
            />

            <InformationPiece
              title="Active devices:"
              text={`${devicesData?.active_count}`}
              isLoading={loadingDevicesData}
            />

            <InformationPiece
              title="Inactive devices:"
              text={`${devicesData?.total_count - devicesData?.active_count}`}
              isLoading={loadingDevicesData}
            />

            <Button
              variant="contained"
              sx={{ width: '100%', height: '45px' }}
              onClick={openCreateDeviceModal}
            >
              Create device
            </Button>
          </Stack>

          {(loadingDevicesData && <ProgressBar isFullPage />) || (
            <DeviceList
              devicesData={devicesData.devices}
              pagesQty={
                getQtyOfPages(devicesData?.total_count, limitPerPage) || 0
              }
              chosenPageNumber={devicesData.page_number}
              setOffset={setOffset}
              isShortView
            />
          )}
        </Stack>
      )}

      {!!errorDevicesData && (
        <NotificationBar text={errorDevicesData.message} typeOfBar="error" />
      )}

      {!!errorDevicesData && (
        <NotificationBar text={errorCreateDevice.message} typeOfBar="error" />
      )}

      <CreateDeviceModal
        isOpen={isOpenCreateDevice}
        onClose={closeCreateDeviceModal}
        onSubmit={createDeviceOnSubmit}
        isLoading={loadingCreateDevice}
      />
    </>
  );
};
