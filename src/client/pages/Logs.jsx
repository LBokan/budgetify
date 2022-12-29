import React from 'react';
import { useApolloClient, useLazyQuery } from '@apollo/client';
import { Box, Stack, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';

import { GET_REPORT } from '@/api/query/device';
import {
  ChartBar,
  ChartDoughnut,
  ChartLine,
  FiltersLogs,
  NotificationBar,
  ReportDataCheck,
  TableReport
} from '@/components';
import {
  getChartBarData,
  getChartBarOptions,
  getChartDoughnutData,
  getChartDoughnutOptions,
  getChartLineData,
  getChartLineOptions
} from '@/helpers';
import { useThemeMode } from '@/hooks';

import {
  setBgColor,
  setChartDoughnutBorderColor,
  setGridChartColor
} from './styles';

export const Logs = () => {
  const [filters, setFilters] = React.useState({
    deviceNames: [],
    deviceTypes: [],
    deviceStatuses: [],
    dateStart: null,
    dateEnd: null
  });
  const [isOpenChart, setIsOpenChart] = React.useState(false);

  const { themeMode } = useThemeMode();

  const client = useApolloClient();

  const [
    getDevicesReport,
    {
      loading: loadingDevicesReportData,
      error: errorDevicesReportData,
      data: { getReport: devicesReportData } = { getReport: {} }
    }
  ] = useLazyQuery(GET_REPORT, { fetchPolicy: 'network-only' });

  const createReportOnClick = () => {
    client.resetStore();

    getDevicesReport({
      variables: {
        filterByName: filters.deviceNames,
        filterByType: filters.deviceTypes,
        filterByStatus: filters.deviceStatuses,
        filterByDateStart: filters.dateStart,
        filterByDateEnd: filters.dateEnd
      }
    });

    setIsOpenChart(true);
  };

  const closeChartOnReset = () => {
    setIsOpenChart(false);
  };

  return (
    <>
      <FiltersLogs
        filtersData={filters}
        setFiltersOnChange={setFilters}
        createReportOnClick={createReportOnClick}
        closeChartOnReset={closeChartOnReset}
      />

      {(isOpenChart && !!devicesReportData && !loadingDevicesReportData && (
        <Stack
          direction="column"
          mt="40px"
          p="20px"
          borderRadius="10px"
          bgcolor={setBgColor(themeMode)}
        >
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="flex-start"
          >
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              maxWidth="40%"
              width="100%"
            >
              <Typography variant="h3" sx={{ mb: '20px' }}>
                Quantity of logs per date
              </Typography>

              <ChartLine
                data={getChartLineData(devicesReportData.chart_line)}
                options={getChartLineOptions(
                  devicesReportData.chart_line,
                  setGridChartColor,
                  themeMode
                )}
              />
            </Stack>

            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              maxWidth="40%"
              width="100%"
            >
              <Typography variant="h3" sx={{ mb: '20px' }}>
                Quantity of created devices
              </Typography>

              <ChartBar
                data={getChartBarData(devicesReportData.chart_bar)}
                options={getChartBarOptions(setGridChartColor, themeMode)}
              />
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="space-around" mt="40px">
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              maxWidth="30%"
              width="100%"
            >
              <Typography variant="h3" sx={{ mb: '20px' }}>
                Quantity of active/inactive devices
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: '10px',
                  width: '100%'
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700 }}
                >{`Total: ${devicesReportData.total_count}`}</Typography>
                <Typography
                  variant="h4"
                  sx={{ ml: '15px', color: green[700] }}
                >{`Active: ${devicesReportData.active_count}`}</Typography>
                <Typography variant="h4" sx={{ ml: '15px', color: red[900] }}>
                  {`Inactive: ${
                    devicesReportData.total_count -
                    devicesReportData.active_count
                  }`}
                </Typography>
              </Box>

              <ChartDoughnut
                data={getChartDoughnutData(
                  devicesReportData,
                  setChartDoughnutBorderColor,
                  themeMode
                )}
                options={getChartDoughnutOptions()}
                stylesObj={{
                  maxHeight: '150px'
                }}
              />
            </Stack>

            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              maxWidth="40%"
              width="100%"
            >
              <Typography variant="h3" sx={{ mb: '20px' }}>
                Device logs decoding
              </Typography>

              <TableReport devicesData={devicesReportData.table} />
            </Stack>
          </Stack>
        </Stack>
      )) || <ReportDataCheck filtersData={filters} />}

      {!!errorDevicesReportData && (
        <NotificationBar
          text={errorDevicesReportData.message}
          typeOfBar="error"
        />
      )}
    </>
  );
};
