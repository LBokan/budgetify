const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  mobileNumber: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdDevices: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Device'
    }
  ]
});

module.exports = model('User', userSchema);
