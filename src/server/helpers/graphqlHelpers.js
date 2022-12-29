const Users = require('../models/user');
const Devices = require('../models/device');

const getUserData = async (userId) => {
  const userData = await Users.findById(userId);

  return {
    ...userData._doc,
    id: userData.id,
    createdDevices: getDevicesData.bind(this, userData._doc.createdDevices)
  };
};

const getDevicesData = async (devicesId) => {
  const devicesData = await Devices.find({ id: { $in: devicesId } });

  return devicesData.map((device) => ({
    ...device._doc,
    id: device.id,
    creator: getUserData.bind(this, device.creator)
  }));
};

module.exports = {
  getUserData,
  getDevicesData
};
