import React from 'react';
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  Modal,
  Stack,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import { loginWavesDarkImage, loginWavesLightImage } from '@/assets/img';
import { useThemeMode } from '@/hooks';

import { ConfirmationModal } from '../ConfirmationModal';

import { setBgColor, setBorder, setIconColor } from './styles';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
});

export const RegistrationModal = ({ isOpen, onClose, onSubmit }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] =
    React.useState(false);

  const { themeMode } = useThemeMode();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm({ values: '' });
    }
  });

  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

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

          <Typography variant="h2" sx={{ mb: '35px', fontSize: '18px' }}>
            Add new user
          </Typography>

          <FormControl
            sx={{
              position: 'relative',
              pb: '40px'
            }}
            fullWidth
          >
            <InputLabel
              htmlFor="email"
              size="small"
              sx={{ top: '2px' }}
              error={formik.touched.email && Boolean(formik.errors.email)}
            >
              Email
            </InputLabel>
            <InputBase
              id="email"
              size="medium"
              sx={{ minHeight: '45px' }}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            <FormHelperText
              sx={{
                position: 'absolute',
                bottom: '20px'
              }}
              error={formik.touched.email && Boolean(formik.errors.email)}
            >
              {formik.touched.email && formik.errors.email}
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
              htmlFor="password"
              size="small"
              sx={{ top: '2px' }}
              error={formik.touched.password && Boolean(formik.errors.password)}
            >
              Password
            </InputLabel>
            <InputBase
              id="password"
              size="medium"
              sx={{ minHeight: '45px' }}
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    sx={{ color: setIconColor(themeMode) }}
                    aria-label="Toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText
              sx={{ position: 'absolute', bottom: '20px' }}
              error={formik.touched.password && Boolean(formik.errors.password)}
            >
              {formik.touched.password && formik.errors.password}
            </FormHelperText>
          </FormControl>

          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" sx={{ height: '45px' }} type="submit">
              Submit
            </Button>
            <Button
              variant="outlined"
              sx={{ ml: '30px', height: '45px' }}
              onClick={formik.dirty ? openConfirmationModal : resetFormOnClose}
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
              themeMode === 'light' ? loginWavesLightImage : loginWavesDarkImage
            }
            alt="Waves image"
          />
        </Stack>
      </Modal>

      <ConfirmationModal
        isOpen={isOpenConfirmationModal}
        onClose={closeConfirmationModal}
        onSubmit={resetFormOnClose}
        text="Do you really want to cancel the adding of a new user? All you entered data will be lost"
        variant="danger"
      />
    </>
  );
};

RegistrationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
