import moment from 'moment';

export const getDateToday = () => {
  return moment().get().format('YYYY-MM-DD');
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
