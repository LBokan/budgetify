import { gql } from '@apollo/client';

export const GET_ALL_DEVICES = gql`
  query Device(
    $offset: Int
    $limit: Int
    $sortByName: Boolean
    $isSortDescending: Boolean
    $filterByName: String
    $filterByType: [String]
    $filterByStatus: [String]
  ) {
    getAllDevices(
      offset: $offset
      limit: $limit
      sortByName: $sortByName
      isSortDescending: $isSortDescending
      filterByName: $filterByName
      filterByType: $filterByType
      filterByStatus: $filterByStatus
    ) {
      page_size
      page_number
      total_count
      active_count
      devices {
        id
        deviceName
        deviceType
        isActive
        allDeviceLogs {
          date
          totalIssuesCount
          issues {
            name
            count
          }
        }
        currentWeekLogs {
          date
          totalIssuesCount
          issues {
            name
            count
          }
        }
      }
    }
  }
`;

export const GET_ALL_DEVICE_TYPES = gql`
  query Type {
    getAllDeviceTypes {
      id
      name
    }
  }
`;
