const moment = require('moment');

const getCurrentWeekDaysArr = () => {
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

const getCurrentWeekLogsArr = (logsArr) => {
  const weekDaysArr = getCurrentWeekDaysArr();

  return logsArr.filter((log) => {
    for (let i = 0; i < weekDaysArr.length; i++) {
      if (
        +moment(log.date).format('DD') == +moment(weekDaysArr[i]).format('DD')
      ) {
        return true;
      }

      return false;
    }
  });
};

module.exports = { getCurrentWeekLogsArr };
