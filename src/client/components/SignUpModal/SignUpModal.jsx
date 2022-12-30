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
import { ProgressBar } from '../ProgressBar';

import { setBgColor, setBorder, setIconColor } from './styles';

const mobileNumberRegExp =
  /^[+]?[(]?[1-9]{1,2}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{3}[-s.]?[0-9]{3}$/;

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
    ),
  email: yup
    .string('Enter your email')
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .trim()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
});

export const SignUpModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] =
    React.useState(false);

  const { themeMode } = useThemeMode();

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      mobileNumber: '',
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values, formik.handleReset);
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
          position="absolute"
          top="50%"
          left="50%"
          p="40px"
          pb="80px"
          maxWidth="500px"
          width="100%"
          border={setBorder(themeMode)}
          borderRadius="10px"
          boxShadow={24}
          bgcolor={setBgColor(themeMode)}
          overflow="hidden"
          sx={{ transform: 'translate(-50%, -50%)' }}
          onSubmit={formik.handleSubmit}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px'
            }}
            onClick={formik.dirty ? openConfirmationModal : resetFormOnClose}
            aria-label="Close sign up modal"
          >
            <Close />
          </IconButton>

          <Typography variant="h2" sx={{ mb: '35px', fontSize: '18px' }}>
            Sign up
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
                required
                size="small"
                sx={{ top: '2px' }}
                error={formik.touched.name && Boolean(formik.errors.name)}
              >
                Name
              </InputLabel>
              <InputBase
                id="name"
                size="medium"
                sx={{ minHeight: '45px' }}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
              />
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
                required
                size="small"
                sx={{ top: '2px' }}
                error={formik.touched.surname && Boolean(formik.errors.surname)}
              >
                Surname
              </InputLabel>
              <InputBase
                id="surname"
                size="medium"
                sx={{ minHeight: '45px' }}
                value={formik.values.surname}
                onChange={formik.handleChange}
                error={formik.touched.surname && Boolean(formik.errors.surname)}
              />
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
              pb: '40px'
            }}
            fullWidth
          >
            <InputLabel
              htmlFor="mobileNumber"
              size="small"
              sx={{ top: '2px' }}
              error={
                formik.touched.mobileNumber &&
                Boolean(formik.errors.mobileNumber)
              }
            >
              Mobile number
            </InputLabel>
            <InputBase
              id="mobileNumber"
              size="medium"
              sx={{ minHeight: '45px' }}
              placeholder="+XX-XXX-XXX-XXX"
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.mobileNumber &&
                Boolean(formik.errors.mobileNumber)
              }
            />
            <FormHelperText
              sx={{
                position: 'absolute',
                bottom: '20px'
              }}
              error={
                formik.touched.mobileNumber &&
                Boolean(formik.errors.mobileNumber)
              }
            >
              {formik.touched.mobileNumber && formik.errors.mobileNumber}
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
              htmlFor="email"
              required
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
              required
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
            <Button
              variant="contained"
              sx={{ minWidth: '100px', height: '45px' }}
              type="submit"
            >
              {(isLoading && <ProgressBar size="20px" color="inherit" />) ||
                'Submit'}
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
        text="Do you really want to cancel sign up process? All you entered data will be lost"
        variant="danger"
      />
    </>
  );
};

SignUpModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};
