import * as C from './databaseConstants';

export const arrivalSet = (id, time) => ({ type: C.ARRIVAL_SET, id, time });
export const departureSet = (id, time) => ({ type: C.DEPARTURE_SET, id, time });
export const dayTypeSet = (id, dayType) => ({ type: C.DAY_TYPE_SET, id, dayType });

export const arrivedPressed = () => ({ type: C.ARRIVED_PRESSED});
export const leftPressed = () => ({ type: C.LEFT_PRESSED});