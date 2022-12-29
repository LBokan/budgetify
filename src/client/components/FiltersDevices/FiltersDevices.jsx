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
import { getDeviceStatusOptions, getDeviceTypesOptions } from '@/helpers';

import { SelectControlled } from '../SelectControlled';

export const FiltersDevices = ({ filtersData, setFiltersOnChange }) => {
  const [isResetButtonDisabled, setIsResetButtonDisabled] =
    React.useState(true);

  const {
    loading: loadingDeviceTypes,
    error: errorDeviceTypes,
    data: { getAllDeviceTypes: deviceTypesData } = { getAllDeviceTypes: [] }
  } = useQuery(GET_ALL_DEVICE_TYPES);

  const handleInput = (event) => {
    setFiltersOnChange((prevState) => ({
      ...prevState,
      deviceName: event.target.value
    }));
  };

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

  const toggleIsResetButtonDisabled = () => {
    if (
      filtersData.deviceName ||
      filtersData.deviceTypes.length ||
      filtersData.deviceStatuses.length
    ) {
      setIsResetButtonDisabled(false);
    } else {
      setIsResetButtonDisabled(true);
    }
  };

  const resetFiltersOnClick = () => {
    setFiltersOnChange((prevState) => ({
      ...prevState,
      deviceName: '',
      deviceTypes: [],
      deviceStatuses: []
    }));
  };

  React.useEffect(() => {
    setFiltersOnChange({
      deviceName: filtersData.deviceName,
      deviceTypes: filtersData.deviceTypes,
      deviceStatuses: filtersData.deviceStatuses
    });

    toggleIsResetButtonDisabled();
  }, [
    filtersData.deviceName,
    filtersData.deviceTypes,
    filtersData.deviceStatuses
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
              value={filtersData.deviceName}
              onChange={handleInput}
            />
          </FormControl>

          <SelectControlled
            name="deviceType"
            isMultiple
            value={filtersData.deviceTypes}
            labelText="Type of device"
            onChange={(event) => handleSelect(event, 'deviceTypes')}
            dataLoading={loadingDeviceTypes}
            listOfOptions={getDeviceTypesOptions(deviceTypesData)}
          />

          <SelectControlled
            name="deviceStatus"
            isMultiple
            value={filtersData.deviceStatuses}
            labelText="Status of device"
            onChange={(event) => handleSelect(event, 'deviceStatuses')}
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
    deviceName: PropTypes.string,
    deviceTypes: PropTypes.arrayOf(PropTypes.string),
    deviceStatuses: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  setFiltersOnChange: PropTypes.func.isRequired
};
