const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');

const { getCurrentWeekLogsArr } = require('../helpers/databaseHelpers');

const Logs = require('../models/log');

const DeviceType = new GraphQLObjectType({
  name: 'Device',
  fields: () => ({
    id: { type: GraphQLID },
    deviceName: { type: new GraphQLNonNull(GraphQLString) },
    deviceType: { type: new GraphQLNonNull(GraphQLString) },
    isActive: { type: new GraphQLNonNull(GraphQLBoolean) },
    allDeviceLogs: {
      type: new GraphQLList(DeviceLogType),
      resolve(parent) {
        return new Promise((resolve) =>
          resolve(Logs.find({ deviceId: parent.id }))
        ).then((value) => value[0]?.deviceLogs);
      }
    },
    currentWeekLogs: {
      type: new GraphQLList(DeviceLogType),
      resolve(parent) {
        return new Promise((resolve) =>
          resolve(Logs.find({ deviceId: parent.id }))
        ).then((value) => getCurrentWeekLogsArr(value[0]?.deviceLogs));
      }
    }
  })
});

const LogType = new GraphQLObjectType({
  name: 'Log',
  fields: () => ({
    id: { type: GraphQLID },
    deviceId: { type: GraphQLString },
    deviceLogs: { type: new GraphQLList(DeviceLogType) }
  })
});

const DeviceLogType = new GraphQLObjectType({
  name: 'DeviceLog',
  fields: () => ({
    date: { type: GraphQLString },
    totalIssuesCount: { type: GraphQLInt },
    issues: { type: new GraphQLList(IssueType) }
  })
});

const IssueType = new GraphQLObjectType({
  name: 'Issue',
  fields: () => ({
    name: { type: GraphQLString },
    count: { type: GraphQLInt }
  })
});

const TypeType = new GraphQLObjectType({
  name: 'Type',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

module.exports = { DeviceType, LogType, TypeType };
