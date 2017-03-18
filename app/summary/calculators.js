
export const workingDays = (data) => {
    let workDays = 0;
    let sickDays = 0;
    let daysOff = 0;
    let totalHours = 0;
    let totalMinutes = 0;
    let holidays = 0;
    data.forEach(x => {
        if (x.total && !x.total.includes('0 >') && (x.dayType === 'Working Day' || x.dayType === 'Half Day Off')) {
            if (x.dayType === 'Working Day') {
                workDays++;
            }
            else {
                daysOff+= 0.5;
                workDays+=0.5;
            }
            totalHours+= parseInt(x.total.split(':')[0]);
            totalMinutes+= parseInt(x.total.split(':')[1]);
        }
        else if (x.dayType === 'Sick Day') {
            sickDays++;
        }
        else if (x.dayType === "Day Off") {
            daysOff++;
        }
        else if (x.dayType === 'Holiday') {
            holidays++;
        }
    });
    const dailyAvgMin = workDays > 0 ? parseInt((totalHours * 60 + totalMinutes)/workDays) : 0;
    const extraMinutes = (totalHours * 60 + totalMinutes) - workDays * 9 * 60;
    totalHours+= parseInt(totalMinutes/60);
    const leftMinutes = totalMinutes%60;

    return {
        workDays, daysOff, sickDays, holidays,
        totalHours: totalHours + ':' + (leftMinutes < 10 ? "0" : "") + leftMinutes,
        dailyAverage: formatMinutes(dailyAvgMin),
        extra: formatMinutes(extraMinutes)
    };
};

const formatMinutes = minutes => {
    const hours = parseInt(minutes/60);
    const addLeadingNeg = minutes < 0 && minutes > -60;
    if (minutes < 0) {
        minutes = minutes * -1;
    }
    const minutesString = (minutes%60 < 10 ? "0" : "") + minutes%60;
    return (addLeadingNeg ? '-' : '') + hours + ':' + minutesString;
};