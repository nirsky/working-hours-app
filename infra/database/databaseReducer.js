import * as C from './databaseConstants';
import { getIdFromDate } from 'infra/date-utils';

const databaseReducer = (state = {}, action) => {
    const now = new Date();
    let id;
    switch (action.type) {
        case C.ARRIVED_PRESSED:
            id = getIdFromDate(now);
            return {
                ...state,
                [id]: {
                    ...state[id],
                    arrival: now.toString(),
                    total: getTimeDifference(state[id], { arrival: now.toString() })
                }
            };
        case C.LEFT_PRESSED:
            id = getIdFromDate(now);
            return {
                ...state,
                [id]: {
                    ...state[id],
                    departure: now.toString(),
                    total: getTimeDifference(state[id], { departure: now.toString() })
                }
            };
        case C.ARRIVAL_SET:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    arrival: action.time,
                    total: getTimeDifference(state[action.id], { arrival: action.time })
                }
            };
        case C.DEPARTURE_SET:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    departure: action.time,
                    total: getTimeDifference(state[action.id], { departure: action.time })
                }
            };
        case C.DAY_TYPE_SET:
            return action.dayType === 'Cancel' ? state :
                {
                    ...state,
                    [action.id]: {
                        ...state[action.id],
                        dayType: action.dayType
                    }
                };
        default:
            return state;
    }

};

const getTimeDifference = (data, { arrival, departure }) => {
    if (!data) return undefined;
    if (arrival && data.departure) {
        return calculateTotalHours(arrival, data.departure)
    }
    if (departure && data.arrival) {
        return calculateTotalHours(data.arrival, departure)
    }
    return undefined;
};

const calculateTotalHours = (arrival, departure) => {
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);

    const diffMs = (departureDate - arrivalDate);
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours

    if (diffMins === 60) {
        diffHrs = diffHrs + 1;
        diffMins = 0;
    }

    return diffHrs + ":" + (diffMins < 10 ? "0" : "") + diffMins;
};

export default databaseReducer;