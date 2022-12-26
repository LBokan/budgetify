import React from 'react';
import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { useThemeMode } from '@/hooks';

import { setBgColor, setTextActiveColor } from './styles';

export const InformationPiece = ({ title = '', text }) => {
  const { themeMode } = useThemeMode();

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        p: '10px 20px',
        maxWidth: '180px',
        width: '100%',
        bgcolor: setBgColor(themeMode),
        borderRadius: '10px',
        boxShadow: 1
      }}
    >
      <Typography variant="h3">{title}</Typography>
      <Typography
        variant="h2"
        sx={{
          mt: '5px',
          fontSize: '20px',
          color: setTextActiveColor(themeMode, title)
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

InformationPiece.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string.isRequired
};
