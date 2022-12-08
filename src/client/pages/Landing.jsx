import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Button } from '@mui/material';

import { CREATE_DEVICE } from '@/api/mutation/device';
import { GET_ALL_DEVICES, GET_ALL_DEVICE_TYPES } from '@/api/query/device';
import { CreateDeviceModal, DeviceList } from '@/components';
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

  const {
    loading: loadingDeviceTypes,
    error: errorDeviceTypes,
    data: { getAllDeviceTypes: deviceTypesData } = { getAllDeviceTypes: [] }
  } = useQuery(GET_ALL_DEVICE_TYPES);

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

  if (errorDevicesData) throw errorDevicesData;
  if (errorDeviceTypes) throw errorDeviceTypes;

  if (loadingDevicesData) return <div>Loading...</div>;

  return (
    <>
      <Box sx={{ width: '100%', textAlign: 'end' }}>
        <Button onClick={openCreateDeviceModal}>Create device</Button>
      </Box>

      {!!devicesData?.devices && !loadingDevicesData && (
        <DeviceList
          devicesData={devicesData.devices}
          pagesQty={getQtyOfPages(devicesData?.total_count, limitPerPage) || 0}
          chosenPageNumber={offset}
          setOffset={setOffset}
        />
      )}

      {!!deviceTypesData && !loadingDeviceTypes && (
        <CreateDeviceModal
          deviceTypesData={deviceTypesData}
          isOpen={isOpenCreateDevice}
          onClose={closeCreateDeviceModal}
          onSubmit={createDeviceOnSubmit}
        />
      )}
    </>
  );
};
