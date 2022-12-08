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

export const SelectControlled = ({
  name,
  size = 'medium',
  stylesObjSelect = {},
  value,
  labelText = '',
  onChange,
  dataLoading,
  isErrorData = false,
  errorData = '',
  listOfOptions
}) => {
  return (
    <FormControl
      sx={{
        position: 'relative',
        pb: '40px'
      }}
      fullWidth
    >
      {(!dataLoading && (
        <>
          {!!labelText && (
            <InputLabel
              htmlFor={name}
              required
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
  stylesObjSelect: PropTypes.objectOf(
    PropTypes.oneOf([PropTypes.string, PropTypes.number])
  ),
  value: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  dataLoading: PropTypes.bool,
  isErrorData: PropTypes.bool,
  errorData: PropTypes.string,
  listOfOptions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
    .isRequired
};
