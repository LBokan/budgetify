import React from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Button, Stack } from '@mui/material';

import { CREATE_DEVICE } from '@/api/mutation/device';
import { GET_ALL_DEVICES } from '@/api/query/device';
import {
  CreateDeviceModal,
  DeviceList,
  InformationPiece,
  NotificationBar,
  ProgressBar
} from '@/components';
import { getQtyOfPages } from '@/helpers';

export const Landing = () => {
  const [isOpenCreateDevice, setIsOpenCreateDevice] = React.useState(false);

  const [notificationBar, setNotificationBar] = React.useState({
    isOpen: false,
    typeOfBar: '',
    text: ''
  });

  const [offset, setOffset] = React.useState(0);
  const limitPerPage = 3;

  const client = useApolloClient();

  const {
    loading: loadingDevicesData,
    data: { getAllDevices: devicesData } = { getAllDevices: {} }
  } = useQuery(GET_ALL_DEVICES, {
    variables: {
      offset,
      limit: limitPerPage
    },
    onError: (error) => {
      setNotificationBar((prevState) => ({
        ...prevState,
        isOpen: true,
        typeOfBar: 'error',
        text: error.message
      }));
    }
  });

  const [createDevice, { loading: loadingCreateDevice }] = useMutation(
    CREATE_DEVICE,
    {
      refetchQueries: [GET_ALL_DEVICES],
      onError: (error) => {
        setNotificationBar((prevState) => ({
          ...prevState,
          isOpen: true,
          typeOfBar: 'error',
          text: error.message
        }));
      }
    }
  );

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
        setNotificationBar((prevState) => ({
          ...prevState,
          isOpen: true,
          typeOfBar: 'success',
          text: 'Creation of the device was successful'
        }));
      }
    });
    closeCreateDeviceModal();
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
      {!!devicesData && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-around"
            mt="10px"
            px="50px"
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              spacing={3}
              width="100%"
            >
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
            </Stack>

            <Button
              variant="contained"
              sx={{ width: '200px', height: '45px' }}
              onClick={openCreateDeviceModal}
            >
              Create device
            </Button>
          </Stack>

          {(loadingDevicesData && <ProgressBar isFullPage />) || (
            <DeviceList
              devicesData={devicesData?.devices}
              pagesQty={
                getQtyOfPages(devicesData?.total_count, limitPerPage) || 0
              }
              chosenPageNumber={devicesData?.page_number}
              setOffset={setOffset}
            />
          )}
        </>
      )}

      {!!notificationBar.isOpen && (
        <NotificationBar
          text={notificationBar.text}
          typeOfBar={notificationBar.typeOfBar}
          setIsOpenBarOnComplete={resetNotificationBarData}
        />
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
