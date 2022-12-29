import { green, red } from '@mui/material/colors';
import moment from 'moment';

export const getDateToday = () => moment().get().format('YYYY-MM-DD');

export const getCurrentWeekDaysArr = () => {
  const weekDaysArr = [];

  let startOfWeekDay = +moment().startOf('week').format('DD');
  let endOfWeekDay = +moment().endOf('week').format('DD');

  let startOfWeek = moment().startOf('week').format('YYYY-MM-');
  let endOfWeek = moment().endOf('week').format('YYYY-MM-');

  for (let i = 0; i < 7; i++) {
    weekDaysArr[i] =
      startOfWeekDay + i < 10
        ? `${startOfWeek}0${startOfWeekDay + i}`
        : `${startOfWeek}${startOfWeekDay + i}`;
  }

  if (endOfWeekDay < startOfWeekDay) {
    for (let i = 0; i < endOfWeekDay; i++) {
      weekDaysArr[6 - i] =
        endOfWeekDay - i < 10
          ? `${endOfWeek}0${endOfWeekDay + i}`
          : `${endOfWeek}${endOfWeekDay + i}`;
    }
  }

  return weekDaysArr;
};

export const getSetDatesLogsArr = (devicesData, isChartBar = false) => {
  let setDatesLogsArr = [];
  const dateToday = getDateToday();

  if (isChartBar) {
    setDatesLogsArr = devicesData.map(
      (devicesInfo) => devicesInfo.dateOfCreate
    );
  } else {
    devicesData.forEach((device) => {
      device?.allDeviceLogs.forEach((log) => {
        let formattedDate = moment(log.date).format('YYYY-MM-DD');

        !setDatesLogsArr.includes(formattedDate) &&
          formattedDate <= dateToday &&
          setDatesLogsArr.push(formattedDate);
      });
    });
  }

  return setDatesLogsArr.sort();
};

export const getMaxLogsQty = (devicesData) => {
  let maxLogsQty = 0;

  devicesData.forEach((device) => {
    device?.allDeviceLogs.forEach(
      (log) =>
        (maxLogsQty =
          log?.totalIssuesCount > maxLogsQty
            ? log?.totalIssuesCount
            : maxLogsQty)
    );
  });

  return maxLogsQty;
};

export const getChartLineData = (devicesData) => ({
  labels: getSetDatesLogsArr(devicesData),
  datasets: [...getChartLineDataset(devicesData)]
});

export const getChartLineDataset = (devicesData) =>
  devicesData.map((device) => ({
    label: device.deviceName,
    data: getChartLineDatasetData(devicesData, device),
    borderWidth: 2,
    borderColor: `rgb(${Math.round(Math.random() * 235) + 20}, ${
      Math.round(Math.random() * 235) + 20
    }, ${Math.round(Math.random() * 235) + 20})`,
    pointBorderWidth: 1
  }));

export const getChartLineDatasetData = (
  devicesData,
  deviceData,
  isCurrentWeek = false
) => {
  const setDatesLogsArr = isCurrentWeek
    ? getCurrentWeekDaysArr()
    : getSetDatesLogsArr(devicesData);
  const datasetDataArr = [];
  const dateToday = getDateToday();

  setDatesLogsArr.forEach((dateLog) => {
    let isLogWithSameDate = deviceData.allDeviceLogs.find(
      (log) =>
        dateLog == moment(log.date).format('YYYY-MM-DD') &&
        moment(log.date).format('YYYY-MM-DD') <= dateToday
    );

    (!!isLogWithSameDate &&
      datasetDataArr.push(isLogWithSameDate.totalIssuesCount)) ||
      (dateLog <= dateToday && datasetDataArr.push(0));
  });

  return datasetDataArr;
};

export const getChartLineOptions = (
  devicesData,
  setGridXChartColor,
  themeMode
) => ({
  scales: {
    y: {
      suggestedMin: 0,
      suggestedMax: getMaxLogsQty(devicesData),
      border: {
        color: setGridXChartColor(themeMode),
        width: 1
      },
      ticks: {
        color: setGridXChartColor(themeMode)
      }
    },
    x: {
      border: {
        color: setGridXChartColor(themeMode),
        width: 1
      },
      ticks: {
        color: setGridXChartColor(themeMode),
        callback(value) {
          return `${moment(this.getLabelForValue(value)).format('MM/DD')}`;
        }
      }
    }
  }
});

export const getChartBarData = (devicesData) => ({
  labels: getSetDatesLogsArr(devicesData, true),
  datasets: [...getChartBarDataset(devicesData)]
});

export const getChartBarDataset = (devicesData) => [
  {
    label: ['Devices quantity'],
    data: devicesData.map((devicesInfo) => devicesInfo.totalDevicesCreated),
    borderWidth: 1,
    backgroundColor: devicesData.map(
      () =>
        `rgb(${Math.round(Math.random() * 235) + 20}, ${
          Math.round(Math.random() * 235) + 20
        }, ${Math.round(Math.random() * 235) + 20})`
    )
  }
];

export const getChartBarOptions = (setGridXChartColor, themeMode) => ({
  layout: {
    padding: 5
  },
  animation: false,
  scales: {
    y: {
      border: {
        color: setGridXChartColor(themeMode),
        width: 1
      },
      ticks: {
        color: setGridXChartColor(themeMode)
      }
    },
    x: {
      border: {
        color: setGridXChartColor(themeMode),
        width: 1
      },
      ticks: {
        color: setGridXChartColor(themeMode)
      }
    }
  },
  plugins: {
    legend: { display: false }
  }
});

export const getChartDoughnutData = (
  devicesData,
  setChartDoughnutBorderColor,
  themeMode
) => ({
  labels: ['Active', 'Inactive'],
  datasets: [
    ...getChartDoughnutDataset(
      devicesData,
      setChartDoughnutBorderColor,
      themeMode
    )
  ]
});

export const getChartDoughnutDataset = (
  devicesData,
  setChartDoughnutBorderColor,
  themeMode
) => [
  {
    label: ['Devices quantity'],
    data: [
      devicesData.active_count,
      devicesData.total_count - devicesData.active_count
    ],
    borderWidth: 1,
    borderColor: setChartDoughnutBorderColor(themeMode),
    backgroundColor: [green[700], red[900]]
  }
];

export const getChartDoughnutOptions = () => ({
  layout: {
    padding: 5
  },
  animation: false,
  scales: {
    y: {
      display: false
    },
    x: {
      display: false
    }
  },
  plugins: {
    legend: { display: false }
  }
});
