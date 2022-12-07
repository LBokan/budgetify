const { Schema, model } = require('mongoose');

const deviceSchema = new Schema({
  dateOfCreate: String,
  deviceName: String,
  deviceType: String,
  isActive: Boolean
});

module.exports = model('Device', deviceSchema);
