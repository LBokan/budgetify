import moment from 'moment';

export const getDateToday = () => {
  return new Date().toISOString().split('T')[0];
};

export const getCurrentWeekDaysArr = () => {
  const weekDaysArr = [];

  let startOfWeek = +moment().startOf('week').format('DD');
  let endOfWeek = +moment().endOf('week').format('DD');

  for (let i = 0; i < 7; i++) {
    weekDaysArr[i] = startOfWeek + i;
  }

  if (endOfWeek < startOfWeek) {
    for (let i = 0; i < endOfWeek; i++) {
      weekDaysArr[6 - i] = endOfWeek - i;
    }
  }

  return weekDaysArr;
};

export const createWeekLogsQtyArr = (logsArr) => {
  const weekDaysArr = getCurrentWeekDaysArr();

  return weekDaysArr.map((day) => {
    const logDataArr = logsArr.filter(
      (log) => day == +moment(log.date).format('DD')
    );

    return logDataArr.length ? logDataArr[0].logs.total_count : 0;
  });
};
