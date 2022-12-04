import React from 'react';
import { useQuery } from '@apollo/client';

import { DeviceList } from '@/components';

// import { getQtyOfPages } from '@/helpers';
import { GET_ALL_DEVICES } from '../api/query/Device';

export const Landing = () => {
  // const [pagesQty, setPagesQty] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const limitPerPage = 3;

  const {
    loading,
    error,
    data: { getAllDevices: devicesData } = { getAllDevices: [] }
  } = useQuery(GET_ALL_DEVICES, {
    variables: {
      offset,
      limit: limitPerPage
    }
  });

  // if (!loadingForQty && !!devicesDataForQty) {
  //   setPagesQty(getQtyOfPages(devicesDataForQty.length, limitPerPage));
  // }

  if (error) throw error;

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <p>LANDING PAGE</p>
      {!!devicesData && !loading && (
        <DeviceList
          devicesData={devicesData}
          pagesQty={3}
          chosenPageNumber={offset}
          setOffset={setOffset}
        />
      )}
    </>
  );
};
