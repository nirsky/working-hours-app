const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
        days.push({
            id: getIdFromDate(date),
            dayType: date.getDay() === 5 || date.getDay() === 6 ? 'Holiday' : 'Working Day',
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