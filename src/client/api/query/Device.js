import { gql } from '@apollo/client';

export const GET_ALL_DEVICES = gql`
  query Device($offset: Int, $limit: Int) {
    getAllDevices(offset: $offset, limit: $limit) {
      page_size
      page_number
      total_count
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
