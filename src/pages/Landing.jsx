import React from 'react';

import { DeviceList } from '@/components';
import { getDateToday } from '@/helpers/chartsHelpers';

import kettleImg from '../assets/img/fromServer/kettle.png';
import lampImg from '../assets/img/fromServer/lamp.png';

export const Landing = () => {
  const dateToday = getDateToday();

  const devicesData = [
    {
      device_name: 'Kettle',
      active: true,
      unique_number: 'DI-K-1',
      device_image: kettleImg,
      logs: [
        {
          date: '2022-11-27',
          logs: { issues: [{ name: 'Wi-Fi issue', count: 8 }], total_count: 8 }
        },
        {
          date: '2022-11-28',
          logs: { issues: [{ name: 'Wi-Fi issue', count: 5 }], total_count: 5 }
        },
        {
          date: dateToday,
          logs: { issues: [{ name: 'Wi-Fi issue', count: 1 }], total_count: 1 }
        }
      ]
    },
    {
      device_name: 'Lamp - living roomdf fdfdsdsf dfsdfs',
      active: true,
      unique_number: 'DI-L-1',
      device_image: lampImg,
      logs: [
        {
          date: '2022-11-27',
          logs: { issues: [{ name: 'Wi-Fi issue', count: 1 }], total_count: 1 }
        },
        {
          date: '2022-11-28',
          logs: { issues: [{ name: 'Wi-Fi issue', count: 2 }], total_count: 2 }
        },
        {
          date: dateToday,
          logs: { issues: [{ name: 'Wi-Fi issue', count: 1 }], total_count: 1 }
        }
      ]
    },
    {
      device_name: 'Lamp - bathroom',
      active: false,
      unique_number: 'DI-L-2',
      device_image: lampImg,
      logs: [
        {
          date: '2022-11-27',
          logs: { issues: [{ name: 'Wi-Fi issue', count: 5 }], total_count: 5 }
        },
        {
          date: '2022-11-28',
          logs: {
            issues: [{ name: 'Wi-Fi issue', count: 10 }],
            total_count: 10
          }
        },
        {
          date: dateToday,
          logs: {
            issues: [
              { name: 'Wi-Fi issue', count: 1 },
              { name: 'Turned on remotely', count: 1 },
              { name: 'Turned off remotely', count: 1 }
            ],
            total_count: 3
          }
        }
      ]
    }
  ];

  return (
    <>
      <p>LANDING PAGE</p>
      <DeviceList devicesData={devicesData} pagesQty={3} />
    </>
  );
};
