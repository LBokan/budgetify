import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Skeleton
} from '@mui/material';
import PropTypes from 'prop-types';

import { setPaddingBottomValue } from './styles';

export const SelectControlled = ({
  name,
  size = 'medium',
  isRequired = false,
  isMultiple = false,
  stylesObjSelect = {},
  value,
  labelText = '',
  onChange,
  dataLoading = false,
  isErrorData = false,
  errorData = '',
  listOfOptions
}) => {
  return (
    <FormControl
      sx={{
        position: 'relative',
        pb: setPaddingBottomValue(isMultiple)
      }}
      fullWidth
    >
      {(!dataLoading && (
        <>
          {!!labelText && (
            <InputLabel
              htmlFor={name}
              required={isRequired}
              size="small"
              sx={{ top: '2px' }}
              error={isErrorData}
            >
              {labelText}
            </InputLabel>
          )}

          <Select
            id={name}
            name={name}
            size={size}
            multiple={isMultiple}
            sx={{ minHeight: '45px', ...stylesObjSelect }}
            value={value}
            onChange={onChange}
            error={isErrorData}
          >
            {listOfOptions.map((item) => (
              <MenuItem key={item.id} value={item.label}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </>
      )) || <Skeleton variant="rectangular" />}

      {!!errorData && (
        <FormHelperText
          sx={{ position: 'absolute', bottom: '20px' }}
          error={isErrorData}
        >
          {errorData}
        </FormHelperText>
      )}
    </FormControl>
  );
};

SelectControlled.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  isRequired: PropTypes.bool,
  isMultiple: PropTypes.bool,
  stylesObjSelect: PropTypes.objectOf(
    PropTypes.oneOf([PropTypes.string, PropTypes.number])
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  labelText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  dataLoading: PropTypes.bool,
  isErrorData: PropTypes.bool,
  errorData: PropTypes.string,
  listOfOptions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
    .isRequired
};
