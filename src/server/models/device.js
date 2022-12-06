const { Schema, model } = require('mongoose');

const deviceSchema = new Schema({
  deviceName: String,
  deviceType: String,
  isActive: Boolean
});

module.exports = model('Device', deviceSchema);
