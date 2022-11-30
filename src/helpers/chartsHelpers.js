import moment from 'moment';

export const getDateToday = () => {
  return moment().get().format('YYYY-MM-DD');
};

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

export const getMaxLogsQty = (devicesData) => {
  let maxLogsQty = 0;

  devicesData.forEach((device) => {
    device.logs.forEach(
      (log) =>
        (maxLogsQty =
          log.logs.total_count > maxLogsQty ? log.logs.total_count : maxLogsQty)
    );
  });

  return maxLogsQty;
};
