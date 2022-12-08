import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Button } from '@mui/material';

import { CREATE_DEVICE } from '@/api/mutation/device';
import { GET_ALL_DEVICES } from '@/api/query/device';
import { CreateDeviceModal, DeviceList, NotificationBar } from '@/components';
import { getQtyOfPages } from '@/helpers';

export const Landing = () => {
  const [isOpenCreateDevice, setIsOpenCreateDevice] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const limitPerPage = 3;

  const {
    loading: loadingDevicesData,
    error: errorDevicesData,
    data: { getAllDevices: devicesData } = { getAllDevices: {} },
    refetch: refetchDevicesData
  } = useQuery(GET_ALL_DEVICES, {
    variables: {
      offset,
      limit: limitPerPage
    }
  });

  const [createDevice] = useMutation(CREATE_DEVICE);

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
      onCompleted: refetchDevicesData
    });
    closeCreateDeviceModal();
  };

  if (loadingDevicesData) return <div>Loading...</div>;

  return (
    <>
      <Box sx={{ width: '100%', textAlign: 'end' }}>
        <Button variant="contained" onClick={openCreateDeviceModal}>
          Create device
        </Button>
      </Box>

      {!!devicesData?.devices && !loadingDevicesData && (
        <DeviceList
          devicesData={devicesData.devices}
          pagesQty={getQtyOfPages(devicesData?.total_count, limitPerPage) || 0}
          chosenPageNumber={offset}
          setOffset={setOffset}
        />
      )}

      {!!errorDevicesData && (
        <NotificationBar text={errorDevicesData.message} typeOfBar="error" />
      )}

      <CreateDeviceModal
        isOpen={isOpenCreateDevice}
        onClose={closeCreateDeviceModal}
        onSubmit={createDeviceOnSubmit}
      />
    </>
  );
};
