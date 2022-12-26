export const getDeviceTypesOptions = (deviceTypesData) => {
  return (deviceTypesData || []).map((deviceType) => ({
    id: deviceType.id,
    label: deviceType.name
  }));
};

export const getDeviceStatusOptions = () => {
  const labelsArr = ['Active', 'Inactive'];

  return labelsArr.map((deviceStatus) => ({
    id: deviceStatus,
    label: deviceStatus
  }));
};
