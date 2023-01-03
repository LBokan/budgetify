import React from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  InputBase,
  InputLabel,
  Skeleton,
  Stack,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import { ConfirmationModal, ProgressBar } from '@/components';

const mobileNumberRegExp =
  /^[+]?[(]?[1-9]{2}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{3}[-s.]?[0-9]{3}$/;

const validationSchema = yup.object({
  name: yup.string('Enter your name').trim().required('Name is required'),
  surname: yup
    .string('Enter your surname')
    .trim()
    .required('Surname is required'),
  mobileNumber: yup
    .string('Enter your mobile number')
    .trim()
    .matches(
      mobileNumberRegExp,
      'Mobile number is not valid (format: +XX-XXX-XXX-XXX)'
    )
});

export const EditUserForm = ({
  userData,
  onSubmit,
  isLoadingData = false,
  isLoadingOnEdit = false
}) => {
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] =
    React.useState(false);

  const [isEditMode, setIsEditMode] = React.useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userData.name,
      surname: userData.surname,
      mobileNumber: userData.mobileNumber || ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values, setIsEditMode);
    }
  });

  const resetFormOnClose = () => {
    setIsOpenConfirmationModal(false);
    setIsEditMode(false);
    formik.handleReset();
  };

  const editModeOnClick = () => {
    setIsEditMode(true);
  };

  const openConfirmationModal = () => {
    setIsOpenConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setIsOpenConfirmationModal(false);
  };

  return (
    <>
      <Stack
        component="form"
        mt="20px"
        py="20px"
        width="100%"
        borderTop="1px solid #ccc"
        borderBottom="1px solid #ccc"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h3" sx={{ mb: '20px' }}>
          {isEditMode ? 'Edit account info' : 'Account info'}
        </Typography>

        <Stack direction="row">
          <FormControl
            sx={{
              position: 'relative',
              mr: '20px',
              pb: '40px'
            }}
            fullWidth
          >
            <InputLabel
              htmlFor="name"
              required={isEditMode ? true : false}
              size="small"
              sx={{ top: '2px' }}
              error={formik.touched.name && Boolean(formik.errors.name)}
            >
              Name
            </InputLabel>
            {(!isLoadingData && (
              <InputBase
                id="name"
                size="medium"
                readOnly={isEditMode ? false : true}
                sx={{ minHeight: '45px' }}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
              />
            )) || <Skeleton variant="rectangular" />}
            <FormHelperText
              sx={{
                position: 'absolute',
                bottom: '20px'
              }}
              error={formik.touched.name && Boolean(formik.errors.name)}
            >
              {formik.touched.name && formik.errors.name}
            </FormHelperText>
          </FormControl>

          <FormControl
            sx={{
              position: 'relative',
              pb: '40px'
            }}
            fullWidth
          >
            <InputLabel
              htmlFor="surname"
              required={isEditMode ? true : false}
              size="small"
              sx={{ top: '2px' }}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
            >
              Surname
            </InputLabel>
            {(!isLoadingData && (
              <InputBase
                id="surname"
                size="medium"
                readOnly={isEditMode ? false : true}
                sx={{ minHeight: '45px' }}
                value={formik.values.surname}
                onChange={formik.handleChange}
                error={formik.touched.surname && Boolean(formik.errors.surname)}
              />
            )) || <Skeleton variant="rectangular" />}
            <FormHelperText
              sx={{
                position: 'absolute',
                bottom: '20px'
              }}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
            >
              {formik.touched.surname && formik.errors.surname}
            </FormHelperText>
          </FormControl>
        </Stack>

        <FormControl
          sx={{
            position: 'relative',
            pb: '30px'
          }}
          fullWidth
        >
          <InputLabel
            htmlFor="mobileNumber"
            size="small"
            sx={{ top: '2px' }}
            error={
              formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)
            }
          >
            Mobile number
          </InputLabel>
          {(!isLoadingData && (
            <InputBase
              id="mobileNumber"
              size="medium"
              readOnly={isEditMode ? false : true}
              sx={{ minHeight: '45px' }}
              placeholder="+XX-XXX-XXX-XXX"
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.mobileNumber &&
                Boolean(formik.errors.mobileNumber)
              }
            />
          )) || <Skeleton variant="rectangular" />}
          <FormHelperText
            sx={{
              position: 'absolute',
              bottom: '10px'
            }}
            error={
              formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)
            }
          >
            {formik.touched.mobileNumber && formik.errors.mobileNumber}
          </FormHelperText>
        </FormControl>

        <Stack direction="row" justifyContent="flex-end">
          {isEditMode && (
            <Button
              variant="contained"
              sx={{ minWidth: '100px', height: '45px' }}
              type="submit"
            >
              {(isLoadingOnEdit && (
                <ProgressBar size="20px" color="inherit" />
              )) ||
                'Submit'}
            </Button>
          )}

          <Button
            variant="outlined"
            sx={{ ml: '30px', height: '45px' }}
            onClick={
              !isEditMode
                ? editModeOnClick
                : formik.dirty
                ? openConfirmationModal
                : resetFormOnClose
            }
          >
            {(isEditMode && 'Cancel') || 'Edit account'}
          </Button>
        </Stack>
      </Stack>

      <ConfirmationModal
        isOpen={isOpenConfirmationModal}
        onClose={closeConfirmationModal}
        onSubmit={resetFormOnClose}
        text="Do you really want to cancel the editing of the account? All you entered data will be lost"
        variant="danger"
      />
    </>
  );
};

EditUserForm.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    mobileNumber: PropTypes.string
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoadingData: PropTypes.bool,
  isLoadingOnEdit: PropTypes.bool
};
