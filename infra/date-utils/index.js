const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const getDaysInMonth = (month, year, holidays) => {
    const date = new Date(year, month, 1);
    const days = [];
    const markAsHoliday = Object.keys(holidays).filter(x => holidays[x]);
    while (date.getMonth() === month) {
        days.push({
            id: getIdFromDate(date),
            dayType: markAsHoliday.includes(weekdays[date.getDay()]) ? 'Holiday' : 'Work Day',
            dayName: weekdays[date.getDay()],
            day: date.getDate(),
            month: months[date.getMonth()],
            year: date.getFullYear()
        });
        date.setDate(date.getDate() + 1);
    }
    return days;
};

const getIdFromDate = (date) => `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;

const todayId = () => getIdFromDate(new Date());

export { getDaysInMonth, months, getIdFromDate, todayId };