const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');

const {
  DeviceType,
  DevicesResponseType,
  LogType,
  TypeType
} = require('./types');

const Devices = require('../models/device');
const Logs = require('../models/log');
const Types = require('../models/type');
const { createLogs } = require('../helpers/databaseHelpers');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getAllDevices: {
      type: DevicesResponseType,
      args: { offset: { type: GraphQLInt }, limit: { type: GraphQLInt } },
      resolve(parent, args) {
        return {
          devices: Devices.find()
            .limit(args.limit)
            .skip(args.offset * args.limit)
            .sort({ dateOfCreate: -1 }),
          page_size: args.limit,
          page_number: args.offset,
          total_count: Devices.count()
        };
      }
    },
    getDevice: {
      type: DeviceType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Devices.findById(args.id);
      }
    },
    getAllLogs: {
      type: new GraphQLList(LogType),
      resolve() {
        return Logs.find();
      }
    },
    getDeviceLogs: {
      type: LogType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Logs.findById(args.id);
      }
    },
    getAllDeviceTypes: {
      type: new GraphQLList(TypeType),
      resolve() {
        return Types.find().sort({ name: 1 });
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createDevice: {
      type: DeviceType,
      args: {
        deviceName: { type: new GraphQLNonNull(GraphQLString) },
        deviceType: { type: new GraphQLNonNull(GraphQLString) },
        isActive: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve: (parent, args) => {
        const device = new Devices({
          dateOfCreate: Date.now().toString(),
          deviceName: args.deviceName,
          deviceType: args.deviceType,
          isActive: args.isActive,
          allDeviceLogs: [],
          currentWeekLogs: []
        });

        const deviceLogs = new Logs({
          deviceLogs: createLogs(),
          deviceId: device.id
        });

        deviceLogs.save();

        return device.save();
      }
    },
    editDevice: {
      type: DeviceType,
      args: {
        id: { type: GraphQLID },
        deviceName: { type: new GraphQLNonNull(GraphQLString) },
        deviceType: { type: new GraphQLNonNull(GraphQLString) },
        isActive: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve(parent, args) {
        return Devices.findByIdAndUpdate(
          args.id,
          {
            $set: {
              deviceName: args.deviceName,
              deviceType: args.deviceType,
              isActive: args.isActive
            }
          },
          { new: true }
        );
      }
    },
    deleteDevice: {
      type: DeviceType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Devices.findByIdAndRemove(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
