import React from 'react';
import { useQuery } from '@apollo/client';

import { DeviceList } from '@/components';
import { getQtyOfPages } from '@/helpers';

import { GET_ALL_DEVICES } from '../api/query/Device';

export const Landing = () => {
  const [offset, setOffset] = React.useState(0);
  const limitPerPage = 3;

  const {
    loading,
    error,
    data: { getAllDevices: devicesData } = { getAllDevices: {} }
  } = useQuery(GET_ALL_DEVICES, {
    variables: {
      offset,
      limit: limitPerPage
    }
  });

  if (error) throw error;

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <p>LANDING PAGE</p>
      {!!devicesData?.devices && !loading && (
        <DeviceList
          devicesData={devicesData.devices}
          pagesQty={getQtyOfPages(devicesData?.total_count, limitPerPage) || 0}
          chosenPageNumber={offset}
          setOffset={setOffset}
        />
      )}
    </>
  );
};
