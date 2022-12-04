import {
  clockImage,
  dishwasherImage,
  fanImage,
  feederImage,
  kettleImage,
  light_bulbImage,
  notAvailableImage,
  scooterImage,
  socketImage,
  switchImage,
  vacuumImage
} from '../assets/img';

export const getDeviceTypeImage = (deviceType) => {
  switch (deviceType.toLowerCase().split(' ').join('_')) {
    case 'clock':
      return clockImage;
    case 'dishwasher':
      return dishwasherImage;
    case 'fan':
      return fanImage;
    case 'feeder':
      return feederImage;
    case 'kettle':
      return kettleImage;
    case 'light_bulb':
      return light_bulbImage;
    case 'scooter':
      return scooterImage;
    case 'socket':
      return socketImage;
    case 'switch':
      return switchImage;
    case 'vacuum':
      return vacuumImage;
    default:
      return notAvailableImage;
  }
};
