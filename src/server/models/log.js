const { Schema, model } = require('mongoose');

const logSchema = new Schema({
  deviceId: String,
  deviceLogs: [
    {
      date: String,
      totalIssuesCount: Number,
      issues: [
        {
          name: String,
          count: Number
        }
      ]
    }
  ]
});

module.exports = model('Log', logSchema);
