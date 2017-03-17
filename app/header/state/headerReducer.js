import { SET_YEAR, SET_MONTH } from './headerActions';

const headerReducer = (state = { month: 2, year: 2017}, action) => {
    switch (action.type) {
        case SET_YEAR:
            return {...state, year: action.year};
        case SET_MONTH:
            return {...state, month: action.month};
        case 'LEFT_PRESSED':
        case 'ARRIVED_PRESSED':
            const today = new Date();
            return { month: today.getMonth(), year: today.getFullYear() };
        default:
            return state;
    }
};

export default headerReducer;