import React from 'react';
import { Outlet } from 'react-router-dom';
import { grey } from '@mui/material/colors';

import { ContentContainer } from './ContentContainer';
import { ContentWrapper } from './ContentWrapper';
import { Header } from './Header';

export const Layout = () => {
  const headerStyles = {
    minHeight: '70px',
    backgroundColor: grey[50]
  };

  return (
    <>
      <ContentWrapper type="header" stylesObj={headerStyles}>
        <Header />
      </ContentWrapper>

      <ContentWrapper type="main">
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </ContentWrapper>

      <ContentWrapper type="footer">FOOTER</ContentWrapper>
    </>
  );
};
