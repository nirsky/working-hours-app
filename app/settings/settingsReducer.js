import * as C from './settingsActions';

const settingsReducer = (state = {
    smartQuickAction: false,
    hoursPerDay: '9:30',
    holidays: {
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: true,
        Saturday: true
    }
}, action) => {
    switch (action.type) {
        case C.QUICK_ACTION_MODE:
            return {
                ...state,
                smartQuickAction: !state.smartQuickAction
            };
        case C.REQUIRED_SET:
            return {
                ...state,
                hoursPerDay: action.hours
            };
        case C.HOLIDAYS_SWITCHED:
            return {
                ...state,
                holidays: {
                    ...state.holidays,
                    [action.day]: !state.holidays[action.day]
                }
            };
        default:
            return state;
    }
};

export default settingsReducer;