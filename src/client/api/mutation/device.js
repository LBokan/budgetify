import { gql } from '@apollo/client';

export const CREATE_DEVICE = gql`
  mutation createDevice(
    $deviceName: String!
    $deviceType: String!
    $isActive: Boolean!
  ) {
    createDevice(
      deviceName: $deviceName
      deviceType: $deviceType
      isActive: $isActive
    ) {
      deviceName
      deviceType
      isActive
    }
  }
`;
