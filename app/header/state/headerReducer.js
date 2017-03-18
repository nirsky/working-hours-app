import { SET_YEAR, SET_MONTH, DONE_SCROLLING } from './headerActions';

const headerReducer = (state = { month: 2, year: 2017 , scroll: false }, action) => {
    switch (action.type) {
        case SET_YEAR:
            return {...state, year: action.year };
        case SET_MONTH:
            return {...state, month: action.month };
        case DONE_SCROLLING:
            return {...state, scroll: false};
        case 'LEFT_PRESSED':
        case 'ARRIVED_PRESSED':
            const today = new Date();
            return {
                month: today.getMonth(),
                year: today.getFullYear(),
                scroll: true
            };
        default:
            return state;
    }
};

export default headerReducer;