import moment, { weekdays } from "moment";

export const generateWeeks = (initialDate: string) => {
    const weekDays = weekdays();
    const start = moment(initialDate).day(0).subtract(1, 'week');
    const weeks = Array(3).fill(0);
    return weeks.map((_, week) => weekDays.map(day => moment(start).add(week, 'week').day(day).format('YYYY-MM-DD')));
};