export const getDeviceNamesOptions = (devicesData = []) =>
  devicesData.map((device) => ({
    id: device.id,
    label: device.deviceName
  }));

export const getDeviceTypesOptions = (deviceTypesData = []) =>
  deviceTypesData.map((deviceType) => ({
    id: deviceType.id,
    label: deviceType.name
  }));

export const getDeviceStatusOptions = () => {
  const labelsArr = ['Active', 'Inactive'];

  return labelsArr.map((deviceStatus) => ({
    id: deviceStatus,
    label: deviceStatus
  }));
};

export const getMinDate = (devicesData = []) => {
  let minDate = 9999999999999;

  devicesData.forEach((device) => {
    if (+device.dateOfCreate < minDate) {
      minDate = +device.dateOfCreate;
    }

    device.allDeviceLogs.forEach((log) => {
      if (new Date(log.date).getTime() < new Date(minDate).getTime()) {
        minDate = new Date(log.date).getTime();
      }
    });
  });

  return minDate;
};
