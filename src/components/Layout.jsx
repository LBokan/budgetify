import React from 'react';
import { Outlet } from 'react-router-dom';

import { ContentContainer } from './ContentContainer';
import { ContentWrapper } from './ContentWrapper';

export const Layout = () => {
  return (
    <>
      <ContentWrapper type="header">HEADER</ContentWrapper>

      <ContentWrapper type="main">
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </ContentWrapper>

      <ContentWrapper type="footer">FOOTER</ContentWrapper>
    </>
  );
};
