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

  let firstLogIndex = 0;

  let currentWeekLogsArr = logsArr
    .sort((a, b) => {
      if (a.date < b.date) return -1;

      return 1;
    })
    .filter((log, logIndex) => {
      for (let i = 0; i < weekDaysArr.length; i++) {
        if (moment(log.date).format('YYYY-MM-DD') == weekDaysArr[i]) {
          if (logIndex == 0) {
            firstLogIndex = i;
          }

          return true;
        }
      }

      return false;
    });

  if (firstLogIndex != 0) {
    currentWeekLogsArr = Array(firstLogIndex)
      .fill(0)
      .concat(currentWeekLogsArr);
  }

  return currentWeekLogsArr;
};

const createLogs = () => {
  const dateToday = moment().get().format('YYYY-MM-DD');
  const weekDaysArr = getCurrentWeekDaysArr();

  return weekDaysArr
    .map((day) => {
      const randomCountOfLogs = Math.round(Math.random() * 15);

      if (day > dateToday) return 0;

      return {
        date: `${day}T00:00:00+00:00`,
        totalIssuesCount: randomCountOfLogs,
        issues: [{ name: 'NEW issue', count: randomCountOfLogs }]
      };
    })
    .filter((data) => data != 0);
};

module.exports = { getCurrentWeekLogsArr, createLogs };
