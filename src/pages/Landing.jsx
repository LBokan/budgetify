import React from 'react';

import { DeviceList } from '@/components';

import kettleImg from '../assets/img/fromServer/kettle.png';
import lampImg from '../assets/img/fromServer/lamp.png';
import socketImg from '../assets/img/fromServer/socket.png';
import vacuumImg from '../assets/img/fromServer/vacuum.png';

export const Landing = () => {
  const dateToday = new Date().toISOString().split('T')[0];

  const devicesData = [
    {
      device_name: 'Kettle',
      active: true,
      unique_number: 'DI-K-1',
      device_image: kettleImg,
      logs: [
        {
          date: '2022-11-26',
          logs: {
            issues: [{ name: 'Wi-Fi issue', count: 10 }],
            total_count: 10
          }
        },
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
          date: '2022-11-26',
          logs: { issues: [{ name: 'Wi-Fi issue', count: 4 }], total_count: 4 }
        },
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
          date: '2022-11-26',
          logs: { issues: [{ name: 'Wi-Fi issue', count: 8 }], total_count: 8 }
        },
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
    },
    {
      device_name: 'Robot vacuum',
      active: true,
      unique_number: 'DI-RV-1',
      device_image: vacuumImg,
      logs: [
        {
          date: '2022-11-26',
          logs: { issues: [{ name: 'Wi-Fi issue', count: 3 }], total_count: 3 }
        },
        {
          date: '2022-11-27',
          logs: { issues: [{ name: 'Wi-Fi issue', count: 6 }], total_count: 6 }
        },
        {
          date: '2022-11-28',
          logs: { issues: [{ name: 'Wi-Fi issue', count: 8 }], total_count: 8 }
        },
        {
          date: dateToday,
          logs: {
            issues: [
              { name: 'Start cleaning', count: 1 },
              { name: 'Finish cleaning', count: 1 },
              { name: 'Wi-Fi issue', count: 1 }
            ],
            total_count: 3
          }
        }
      ]
    },
    {
      device_name: 'Socket',
      active: true,
      unique_number: 'DI-S-1',
      device_image: socketImg,
      logs: [
        {
          date: '2022-11-26',
          logs: { issues: [{ name: 'Wi-Fi issue', count: 5 }], total_count: 5 }
        },
        {
          date: '2022-11-27',
          logs: { issues: [{ name: 'Wi-Fi issue', count: 2 }], total_count: 2 }
        },
        {
          date: '2022-11-28',
          logs: { issues: [{ name: 'Wi-Fi issue', count: 6 }], total_count: 6 }
        },
        {
          date: dateToday,
          logs: { issues: [{ name: 'Wi-Fi issue', count: 2 }], total_count: 2 }
        }
      ]
    },
    {
      device_name: 'Socket',
      active: true,
      unique_number: 'DI-S-2',
      device_image: socketImg,
      logs: [
        {
          date: '2022-11-26',
          logs: { issues: [{ name: 'Wi-Fi issue', count: 5 }], total_count: 5 }
        },
        {
          date: '2022-11-27',
          logs: { issues: [{ name: 'Wi-Fi issue', count: 2 }], total_count: 2 }
        },
        {
          date: '2022-11-28',
          logs: { issues: [{ name: 'Wi-Fi issue', count: 6 }], total_count: 6 }
        },
        {
          date: dateToday,
          logs: { issues: [], total_count: 0 }
        }
      ]
    }
  ];

  return (
    <>
      <p>LANDING PAGE</p>
      <DeviceList devicesData={devicesData} />
    </>
  );
};
