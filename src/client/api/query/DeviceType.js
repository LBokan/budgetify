import { gql } from '@apollo/client';

export const GET_ALL_DEVICE_TYPES = gql`
  query Type {
    getAllDeviceTypes {
      id
      name
    }
  }
`;
