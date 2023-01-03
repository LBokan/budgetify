import React from 'react';
import { useQuery } from '@apollo/client';
import { Avatar, Skeleton, Stack, Typography } from '@mui/material';

import { GET_USER } from '@/api/query/user';
import userImage from '@/assets/img/fromServer/cat.jpg';

import { NotificationBar } from '../NotificationBar';

export const UserInfo = () => {
  const {
    loading: loadingUserData,
    error: errorUserData,
    data: { getUser: userData } = { getUser: {} }
  } = useQuery(GET_USER);

  return (
    <>
      {!!userData && (
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Avatar
            sx={{
              mr: '10px',
              width: '40px',
              height: '40px'
            }}
            alt="Profile image"
            src={userImage}
          />

          <Stack alignItems="flex-start" justifyContent="center">
            <Typography variant="h3">
              {(!loadingUserData &&
                `${userData?.name} ${userData?.surname}`) || (
                <Skeleton sx={{ minWidth: '100px' }} />
              )}
            </Typography>

            <Typography variant="subtitle1" sx={{ mt: '3px' }}>
              {(!loadingUserData && userData?.email) || (
                <Skeleton sx={{ minWidth: '100px' }} />
              )}
            </Typography>
          </Stack>
        </Stack>
      )}

      {!!errorUserData && (
        <NotificationBar text={errorUserData.message} typeOfBar="error" />
      )}
    </>
  );
};
