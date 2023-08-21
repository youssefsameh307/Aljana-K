export function generateWeeklyDates(startDate, numWeeks) {
  const dates = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < numWeeks; i++) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 7);
  }

  return dates;
}

export function generateMonthlyDates(startDate, numMonths) {
  const dates = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < numMonths; i++) {
    dates.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return dates;
}
