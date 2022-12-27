import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Button,
  FormControl,
  InputBase,
  InputLabel,
  Stack
} from '@mui/material';
import PropTypes from 'prop-types';

import { GET_ALL_DEVICE_TYPES } from '@/api/query/device';
import { NotificationBar } from '@/components';
import {
  getDeviceStatusOptions,
  getDeviceTypesOptions
} from '@/helpers/selectHelpers';

import { SelectControlled } from '../SelectControlled';

export const FiltersDevices = ({ filtersData, setFiltersOnChange }) => {
  const [isResetButtonDisabled, setIsResetButtonDisabled] =
    React.useState(true);

  const {
    loading: loadingDeviceTypes,
    error: errorDeviceTypes,
    data: { getAllDeviceTypes: deviceTypesData } = { getAllDeviceTypes: [] }
  } = useQuery(GET_ALL_DEVICE_TYPES);

  const handleInput = (event, isReset = false) => {
    if (isReset) {
      setFiltersOnChange((prevState) => ({
        ...prevState,
        deviceNameFilter: ''
      }));

      return;
    } else {
      setFiltersOnChange((prevState) => ({
        ...prevState,
        deviceNameFilter: event.target.value
      }));
    }
  };

  const handleSelect = (event, typeOfFilter, isReset = false) => {
    if (isReset) {
      setFiltersOnChange((prevState) => ({
        ...prevState,
        [typeOfFilter]: []
      }));

      return;
    }

    const selectedValue = event.target.value;

    setFiltersOnChange((prevState) => ({
      ...prevState,
      [typeOfFilter]:
        typeof selectedValue === 'string'
          ? selectedValue.split(',')
          : selectedValue
    }));
  };

  const toggleIsResetButtonDisabled = () => {
    if (
      filtersData.deviceNameFilter ||
      filtersData.deviceTypeFilter.length ||
      filtersData.deviceStatusFilter.length
    ) {
      setIsResetButtonDisabled(false);
    } else {
      setIsResetButtonDisabled(true);
    }
  };

  const resetFiltersOnClick = () => {
    handleInput(null, true);
    handleSelect(null, 'deviceTypeFilter', true);
    handleSelect(null, 'deviceStatusFilter', true);
  };

  React.useEffect(() => {
    setFiltersOnChange({
      deviceNameFilter: filtersData.deviceNameFilter,
      deviceTypeFilter: filtersData.deviceTypeFilter,
      deviceStatusFilter: filtersData.deviceStatusFilter
    });

    toggleIsResetButtonDisabled();
  }, [
    filtersData.deviceNameFilter,
    filtersData.deviceTypeFilter,
    filtersData.deviceStatusFilter
  ]);

  return (
    <>
      {!!deviceTypesData && (
        <Stack
          component="form"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={5}
          mb="20px"
        >
          <FormControl
            sx={{
              position: 'relative'
            }}
            fullWidth
          >
            <InputLabel htmlFor="deviceName" size="small" sx={{ top: '2px' }}>
              Name of device
            </InputLabel>
            <InputBase
              id="deviceName"
              size="medium"
              sx={{ minHeight: '45px' }}
              value={filtersData.deviceNameFilter}
              onChange={handleInput}
            />
          </FormControl>

          <SelectControlled
            name="deviceType"
            isMultiple
            value={filtersData.deviceTypeFilter}
            labelText="Type of device"
            onChange={(event) => handleSelect(event, 'deviceTypeFilter')}
            dataLoading={loadingDeviceTypes}
            listOfOptions={getDeviceTypesOptions(deviceTypesData)}
          />

          <SelectControlled
            name="deviceStatus"
            isMultiple
            value={filtersData.deviceStatusFilter}
            labelText="Status of device"
            onChange={(event) => handleSelect(event, 'deviceStatusFilter')}
            listOfOptions={getDeviceStatusOptions()}
          />

          <Button
            variant="danger"
            disabled={isResetButtonDisabled}
            sx={{ height: '45px' }}
            onClick={resetFiltersOnClick}
          >
            Reset
          </Button>
        </Stack>
      )}

      {!!errorDeviceTypes && (
        <NotificationBar text={errorDeviceTypes.message} typeOfBar="error" />
      )}
    </>
  );
};

FiltersDevices.propTypes = {
  filtersData: PropTypes.shape({
    deviceNameFilter: PropTypes.string,
    deviceTypeFilter: PropTypes.arrayOf(PropTypes.string),
    deviceStatusFilter: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  setFiltersOnChange: PropTypes.func.isRequired
};
