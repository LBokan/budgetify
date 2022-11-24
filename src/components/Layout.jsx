import React from 'react';
import { Outlet } from 'react-router-dom';

import { ContentWrapper } from './ContentWrapper';
import { Header } from './Header';

export const Layout = () => {
  return (
    <>
      <ContentWrapper type="header">
        <Header />
      </ContentWrapper>

      <ContentWrapper type="main">
        <Outlet />
      </ContentWrapper>

      <ContentWrapper type="footer">FOOTER</ContentWrapper>
    </>
  );
};
