export const getDeviceTypesOptions = (deviceTypesData) => {
  return (deviceTypesData || []).map((deviceType) => ({
    id: deviceType.id,
    label: deviceType.name
  }));
};
