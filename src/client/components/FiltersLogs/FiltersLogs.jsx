import React from 'react';
import { useQuery } from '@apollo/client';
import { Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';

import { GET_ALL_DEVICE_TYPES, GET_ALL_DEVICES } from '@/api/query/device';
import { NotificationBar } from '@/components';
import {
  getDateToday,
  getDeviceNamesOptions,
  getDeviceStatusOptions,
  getDeviceTypesOptions,
  getMinDate
} from '@/helpers';

import { SelectControlled } from '../SelectControlled';

import { DateRangePicker } from './DateRangePicker';

export const FiltersLogs = ({
  filtersData,
  setFiltersOnChange,
  createReportOnClick,
  closeChartOnReset
}) => {
  const [isCreateReportButtonDisabled, setIsCreateReportDisabled] =
    React.useState(true);
  const [isResetButtonDisabled, setIsResetButtonDisabled] =
    React.useState(true);

  const {
    loading: loadingDevicesData,
    error: errorDevicesData,
    data: { getAllDevices: { devices: devicesData } } = { getAllDevices: {} }
  } = useQuery(GET_ALL_DEVICES, {
    variables: {
      sortByName: true
    }
  });

  const {
    loading: loadingDeviceTypes,
    error: errorDeviceTypes,
    data: { getAllDeviceTypes: deviceTypesData } = { getAllDeviceTypes: [] }
  } = useQuery(GET_ALL_DEVICE_TYPES);

  const handleSelect = (event, typeOfFilter) => {
    const selectedValue = event.target.value;

    setFiltersOnChange((prevState) => ({
      ...prevState,
      [typeOfFilter]:
        typeof selectedValue === 'string'
          ? selectedValue.split(',')
          : selectedValue
    }));
  };

  const setChosenDatesStart = (value) => {
    setFiltersOnChange((prevState) => ({
      ...prevState,
      dateStart: value
    }));
  };

  const setChosenDatesEnd = (value) => {
    setFiltersOnChange((prevState) => ({
      ...prevState,
      dateEnd: value
    }));
  };

  const toggleIsCreateReportButtonDisabled = () => {
    if (
      (filtersData.deviceNames.length || filtersData.deviceTypes.length) &&
      filtersData.deviceStatuses.length &&
      filtersData.dateStart &&
      filtersData.dateEnd
    ) {
      setIsCreateReportDisabled(false);
    } else {
      setIsCreateReportDisabled(true);
    }
  };

  const toggleIsResetButtonDisabled = () => {
    if (
      filtersData.deviceNames.length ||
      filtersData.deviceTypes.length ||
      filtersData.deviceStatuses.length ||
      filtersData.dateStart ||
      filtersData.dateEnd
    ) {
      setIsResetButtonDisabled(false);
    } else {
      setIsResetButtonDisabled(true);
    }
  };

  const resetFiltersOnClick = () => {
    setFiltersOnChange((prevState) => ({
      ...prevState,
      deviceNames: [],
      deviceTypes: [],
      deviceStatuses: [],
      dateStart: null,
      dateEnd: null
    }));

    closeChartOnReset();
  };

  React.useEffect(() => {
    setFiltersOnChange((prevState) => ({
      ...prevState,
      deviceNames: filtersData.deviceNames,
      deviceTypes: filtersData.deviceTypes,
      deviceStatuses: filtersData.deviceStatuses,
      dateStart: filtersData.dateStart,
      dateEnd: filtersData.dateEnd
    }));

    toggleIsCreateReportButtonDisabled();
    toggleIsResetButtonDisabled();
  }, [
    filtersData.deviceNames,
    filtersData.deviceTypes,
    filtersData.deviceStatuses,
    filtersData.dateStart,
    filtersData.dateEnd
  ]);

  return (
    <>
      {!!devicesData && !!deviceTypesData && (
        <Stack component="form" direction="column" spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={5}
          >
            <SelectControlled
              name="deviceName"
              isMultiple
              value={filtersData.deviceNames}
              labelText="Name of device"
              onChange={(event) => handleSelect(event, 'deviceNames')}
              dataLoading={loadingDevicesData}
              listOfOptions={getDeviceNamesOptions(devicesData)}
            />

            <SelectControlled
              name="deviceType"
              isMultiple
              value={filtersData.deviceTypes}
              labelText="Type of device"
              onChange={(event) => handleSelect(event, 'deviceTypes')}
              dataLoading={loadingDeviceTypes}
              listOfOptions={getDeviceTypesOptions(deviceTypesData)}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={5}
          >
            <SelectControlled
              name="deviceStatus"
              isRequired
              isMultiple
              value={filtersData.deviceStatuses}
              labelText="Status of device"
              onChange={(event) => handleSelect(event, 'deviceStatuses')}
              listOfOptions={getDeviceStatusOptions()}
            />

            <DateRangePicker
              propertyName="dateStart"
              labelText="Date start"
              minDate={getMinDate(devicesData)}
              maxDate={
                filtersData.dateEnd ? filtersData.dateEnd : getDateToday()
              }
              dateData={filtersData.dateStart}
              setDatesOnChange={setChosenDatesStart}
            />

            <DateRangePicker
              propertyName="dateEnd"
              labelText="Date end"
              minDate={
                filtersData.dateStart
                  ? filtersData.dateStart
                  : getMinDate(devicesData)
              }
              maxDate={getDateToday()}
              dateData={filtersData.dateEnd}
              setDatesOnChange={setChosenDatesEnd}
            />

            <Button
              variant="contained"
              disabled={isCreateReportButtonDisabled}
              sx={{ minWidth: '150px', height: '45px' }}
              onClick={createReportOnClick}
            >
              Create report
            </Button>
            <Button
              variant="danger"
              disabled={isResetButtonDisabled}
              sx={{ minWidth: '100px', height: '45px' }}
              onClick={resetFiltersOnClick}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      )}

      {!!errorDevicesData && (
        <NotificationBar text={errorDevicesData.message} typeOfBar="error" />
      )}

      {!!errorDeviceTypes && (
        <NotificationBar text={errorDeviceTypes.message} typeOfBar="error" />
      )}
    </>
  );
};

FiltersLogs.propTypes = {
  filtersData: PropTypes.shape({
    deviceNames: PropTypes.arrayOf(PropTypes.string),
    deviceTypes: PropTypes.arrayOf(PropTypes.string),
    deviceStatuses: PropTypes.arrayOf(PropTypes.string),
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string
  }).isRequired,
  setFiltersOnChange: PropTypes.func.isRequired,
  createReportOnClick: PropTypes.func.isRequired,
  closeChartOnReset: PropTypes.func.isRequired
};
