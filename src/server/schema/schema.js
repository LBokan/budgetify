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
const jwt = require('jsonwebtoken');

const {
  DeviceType,
  DevicesResponseType,
  LogType,
  TypeType,
  UserType,
  AuthDataType
} = require('./types');

const Users = require('../models/user');
const Devices = require('../models/device');
const Logs = require('../models/log');
const Types = require('../models/type');
const {
  createLogs,
  getCurrentWeekLogsArr
} = require('../helpers/databaseHelpers');
const { getUserData } = require('../helpers/graphqlHelpers');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    login: {
      type: AuthDataType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        const userData = await Users.findOne({ email: args.email });

        if (!userData) {
          throw new Error('A user with an email address does not exist');
        }

        const isEqualPassword = await bcrypt.compare(
          args.password,
          userData.password
        );

        if (!isEqualPassword) {
          throw new Error('The entered password is incorrect');
        }

        const token = await jwt.sign(
          {
            userId: userData.id,
            email: userData.email
          },
          'smarthometokenkey',
          { expiresIn: '1h' }
        );

        return {
          userId: userData.id,
          token: token
        };
      }
    },
    getAllDevices: {
      type: DevicesResponseType,
      args: { offset: { type: GraphQLInt }, limit: { type: GraphQLInt } },
      resolve: async (parent, args, request) => {
        if (!request.isAuth) {
          throw new Error('Unauthenticated');
        }

        const devices = await Devices.find({
          creator: request.userId
        })
          .limit(args.limit)
          .skip(args.offset * args.limit)
          .sort({ dateOfCreate: -1 });

        const devicesData = devices.map((device) => {
          return {
            ...device._doc,
            id: device.id,
            allDeviceLogs: Logs.find({ deviceId: device.id }).then(
              (value) => value[0]?.deviceLogs
            ),
            currentWeekLogs: Logs.find({ deviceId: device.id }).then((value) =>
              getCurrentWeekLogsArr(value[0]?.deviceLogs)
            ),
            creator: getUserData.bind(this, device._doc.creator)
          };
        });

        return {
          devices: devicesData,
          page_size: args.limit,
          page_number: args.offset + 1,
          total_count: Devices.find({
            creator: request.userId
          }).count(),
          active_count: Devices.find({
            creator: request.userId,
            isActive: true
          }).count()
        };
      }
    },
    getDevice: {
      type: DeviceType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args, request) {
        return Devices.find({
          creator: request.userId
        }).findById(args.id);
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
    signUp: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        surname: { type: new GraphQLNonNull(GraphQLString) },
        mobileNumber: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        const userData = await Users.findOne({ email: args.email });

        if (userData) {
          throw new Error('A user with an email address already exists');
        }

        const hashedPassword = await bcrypt.hash(args.password, 12);

        const user = new Users({
          name: args.name,
          surname: args.surname,
          mobileNumber: args.mobileNumber,
          email: args.email,
          password: hashedPassword
        });

        const result = await user.save();

        return { ...result._doc, id: result.id, password: null };
      }
    },
    createDevice: {
      type: DeviceType,
      args: {
        deviceName: { type: new GraphQLNonNull(GraphQLString) },
        deviceType: { type: new GraphQLNonNull(GraphQLString) },
        isActive: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve: async (parent, args, request) => {
        if (!request.isAuth) {
          throw new Error('Unauthenticated');
        }

        const device = new Devices({
          dateOfCreate: Date.now().toString(),
          deviceName: args.deviceName,
          deviceType: args.deviceType,
          isActive: args.isActive,
          allDeviceLogs: [],
          currentWeekLogs: [],
          creator: request.userId
        });

        const deviceLogs = new Logs({
          deviceLogs: createLogs(),
          deviceId: device.id
        });

        await deviceLogs.save();

        const result = await device.save();

        let createdDevice = {
          ...result._doc,
          id: result.id,
          creator: getUserData.bind(this, result._doc.creator)
        };

        const creator = await Users.findById(request.userId);

        if (!creator) {
          throw new Error('A user not found');
        }

        creator.createdDevices.push(device);

        await creator.save();

        return createdDevice;
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
      resolve(parent, args, request) {
        if (!request.isAuth) {
          throw new Error('Unauthenticated');
        }

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
      resolve(parent, args, request) {
        if (!request.isAuth) {
          throw new Error('Unauthenticated');
        }

        return Devices.findByIdAndRemove(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
