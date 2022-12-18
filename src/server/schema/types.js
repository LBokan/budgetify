const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');

const AuthDataType = new GraphQLObjectType({
  name: 'AuthData',
  fields: () => ({
    userId: { type: GraphQLID },
    token: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    surname: { type: new GraphQLNonNull(GraphQLString) },
    mobileNumber: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLString },
    createdDevices: { type: new GraphQLList(new GraphQLNonNull(DeviceType)) }
  })
});

const DeviceType = new GraphQLObjectType({
  name: 'Device',
  fields: () => ({
    id: { type: GraphQLID },
    dateOfCreate: { type: GraphQLString },
    deviceName: { type: new GraphQLNonNull(GraphQLString) },
    deviceType: { type: new GraphQLNonNull(GraphQLString) },
    isActive: { type: new GraphQLNonNull(GraphQLBoolean) },
    allDeviceLogs: {
      type: new GraphQLList(DeviceLogType)
    },
    currentWeekLogs: {
      type: new GraphQLList(DeviceLogType)
    },
    creator: {
      type: new GraphQLNonNull(UserType)
    }
  })
});

const DevicesResponseType = new GraphQLObjectType({
  name: 'DevicesResponse',
  fields: () => ({
    devices: { type: new GraphQLList(DeviceType) },
    page_size: { type: GraphQLInt },
    page_number: { type: GraphQLInt },
    total_count: { type: GraphQLInt },
    active_count: { type: GraphQLInt }
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

module.exports = {
  AuthDataType,
  UserType,
  DeviceType,
  DevicesResponseType,
  LogType,
  TypeType
};
