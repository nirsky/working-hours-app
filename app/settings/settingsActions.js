export const REQUIRED_SET = 'REQUIRED_SET';
export const HOLIDAYS_SWITCHED = 'HOLIDAYS_SWITCHED';
export const QUICK_ACTION_MODE = 'QUICK_ACTION_MODE';

export const requiredPerDaySet = hours => ({ type: REQUIRED_SET, hours });
export const alwaysHolidaysSwitched = day => ({ type: HOLIDAYS_SWITCHED, day });
export const quickActionModePressed = () => ({ type: QUICK_ACTION_MODE });