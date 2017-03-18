export const SET_MONTH = 'SET_MONTH';
export const SET_YEAR = 'SET_YEAR';
export const DONE_SCROLLING = 'DONE_SCROLLING';

export const setMonth = month => ({type: SET_MONTH, month});
export const setYear = year => ({type: SET_YEAR, year});
export const doneScrolling = () => ({type: DONE_SCROLLING});