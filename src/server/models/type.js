const { Schema, model } = require('mongoose');

const typeSchema = new Schema({
  name: String
});

module.exports = model('Type', typeSchema);
