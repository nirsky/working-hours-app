import React, { Component } from 'react';
import { ActionSheetIOS } from 'react-native';

const BUTTONS = ['Working Day', 'Day Off', 'Half Day Off', 'Sick Day', 'Holiday', 'Reserve Duty', 'Cancel'];

export const onDayTypePress = (onSubmit, date) => {
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: BUTTONS,
            cancelButtonIndex: 6,
            title: date.replace(/-/g,'/') + ' - What type of day did you have?'
        },
        buttonIndex => onSubmit(BUTTONS[buttonIndex])
    )
};