const { Schema, model } = require('mongoose');

const deviceSchema = new Schema({
  dateOfCreate: String,
  deviceName: String,
  deviceType: String,
  isActive: Boolean,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = model('Device', deviceSchema);
