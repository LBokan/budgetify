import React from 'react';
import { useQuery } from '@apollo/client';
import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputBase,
  InputLabel,
  Modal,
  Stack,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import { GET_ALL_DEVICE_TYPES } from '@/api/query/device';
import { loginWavesDarkImage, loginWavesLightImage } from '@/assets/img';
import { getDeviceTypesOptions } from '@/helpers/selectHelpers';
import { useThemeMode } from '@/hooks';

import { ConfirmationModal } from '../ConfirmationModal';
import { NotificationBar } from '../NotificationBar';
import { SelectControlled } from '../SelectControlled';

import { setBgColor, setBorder } from './styles';

const validationSchema = yup.object({
  deviceName: yup
    .string('Enter a name of device')
    .required('Device name is required'),
  deviceType: yup
    .string('Select a type of device')
    .required('Type of device is required')
});

export const CreateDeviceModal = ({ isOpen, onClose, onSubmit }) => {
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] =
    React.useState(false);

  const { themeMode } = useThemeMode();

  const {
    loading: loadingDeviceTypes,
    error: errorDeviceTypes,
    data: { getAllDeviceTypes: deviceTypesData } = { getAllDeviceTypes: [] }
  } = useQuery(GET_ALL_DEVICE_TYPES);

  const formik = useFormik({
    initialValues: {
      deviceName: '',
      deviceType: '',
      isActive: true
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm({ values: '' });
    }
  });

  const resetFormOnClose = () => {
    setIsOpenConfirmationModal(false);
    onClose();
    formik.handleReset();
  };

  const openConfirmationModal = () => {
    setIsOpenConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setIsOpenConfirmationModal(false);
  };

  return (
    <>
      {!!deviceTypesData && (
        <Modal open={isOpen}>
          <Stack
            component="form"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              p: '40px',
              pb: '80px',
              maxWidth: '500px',
              width: '100%',
              border: setBorder(themeMode),
              borderRadius: '10px',
              boxShadow: 24,
              bgcolor: setBgColor(themeMode),
              overflow: 'hidden'
            }}
            onSubmit={formik.handleSubmit}
          >
            <IconButton
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px'
              }}
              onClick={formik.dirty ? openConfirmationModal : resetFormOnClose}
              aria-label="Close create device modal"
            >
              <Close />
            </IconButton>

            <Typography variant="h2" sx={{ fontSize: '18px' }}>
              Add device
            </Typography>

            <FormControl
              sx={{
                position: 'relative',
                mt: '25px',
                pb: '40px'
              }}
              fullWidth
            >
              <InputLabel
                htmlFor="deviceName"
                required
                size="small"
                sx={{ top: '2px' }}
                error={
                  formik.touched.deviceName && Boolean(formik.errors.deviceName)
                }
              >
                Name
              </InputLabel>
              <InputBase
                id="deviceName"
                size="medium"
                sx={{ minHeight: '45px' }}
                value={formik.values.deviceName}
                onChange={formik.handleChange}
                error={
                  formik.touched.deviceName && Boolean(formik.errors.deviceName)
                }
              />
              <FormHelperText
                sx={{
                  position: 'absolute',
                  bottom: '20px'
                }}
                error={
                  formik.touched.deviceName && Boolean(formik.errors.deviceName)
                }
              >
                {formik.touched.deviceName && formik.errors.deviceName}
              </FormHelperText>
            </FormControl>

            <SelectControlled
              name="deviceType"
              isRequired
              value={formik.values.deviceType}
              labelText="Type of device"
              onChange={formik.handleChange}
              dataLoading={loadingDeviceTypes}
              isErrorData={
                formik.touched.deviceType && Boolean(formik.errors.deviceType)
              }
              errorData={formik.touched.deviceType && formik.errors.deviceType}
              listOfOptions={getDeviceTypesOptions(deviceTypesData)}
            />

            <FormControl
              fullWidth
              sx={{
                position: 'relative',
                pb: '40px'
              }}
            >
              <FormControlLabel
                label="Is active"
                control={
                  <Checkbox
                    checked={formik.values.isActive}
                    name="isActive"
                    onChange={formik.handleChange}
                  />
                }
              />
            </FormControl>

            <Stack direction="row" justifyContent="flex-end">
              <Button variant="contained" sx={{ height: '45px' }} type="submit">
                Submit
              </Button>
              <Button
                variant="outlined"
                sx={{ ml: '30px', height: '45px' }}
                onClick={
                  formik.dirty ? openConfirmationModal : resetFormOnClose
                }
              >
                Cancel
              </Button>
            </Stack>

            <Box
              component="img"
              sx={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '100%',
                maxHeight: '40px'
              }}
              src={
                themeMode === 'light'
                  ? loginWavesLightImage
                  : loginWavesDarkImage
              }
              alt="Waves image"
            />
          </Stack>
        </Modal>
      )}

      {!!errorDeviceTypes && (
        <NotificationBar text={errorDeviceTypes.message} typeOfBar="error" />
      )}

      <ConfirmationModal
        isOpen={isOpenConfirmationModal}
        onClose={closeConfirmationModal}
        onSubmit={resetFormOnClose}
        text="Do you really want to cancel the adding of a new device? All you entered data will be lost"
        variant="danger"
      />
    </>
  );
};

CreateDeviceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
