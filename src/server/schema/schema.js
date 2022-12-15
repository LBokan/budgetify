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
const bcrypt = require('bcrypt');

const {
  DeviceType,
  DevicesResponseType,
  LogType,
  TypeType,
  UserType
} = require('./types');

const Users = require('../models/user');
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
          page_number: args.offset + 1,
          total_count: Devices.count(),
          active_count: Devices.find({ isActive: true }).count()
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
    createUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        return Users.findOne({ email: args.email })
          .then((user) => {
            if (user) {
              throw new Error('A user with an email address already exists');
            }

            return bcrypt.hash(args.password, 12);
          })

          .then((hashedPassword) => {
            const user = new Users({
              email: args.email,
              password: hashedPassword
            });

            return user.save();
          })
          .then((result) => {
            return { ...result._doc, password: null, _id: result.id };
          })
          .catch((error) => {
            throw error;
          });
      }
    },
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
