import React from 'react';
import { View, Text, ScrollView, StyleSheet, Picker } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withToggle } from 'infra/toggle';
import { quickActionModePressed, requiredPerDaySet, alwaysHolidaysSwitched } from './settingsActions';
import DateSelector from 'app/header/DateSelector';

import Credits from './components/Credits';
import HolidayPicker from './components/HolidaysPicker';
import styled from 'styled-components/native';

const SettingsContainer = ({
    smartQuickAction, quickActionModePressed, requiredPicker,
    hoursPerDay, requiredPerDaySet, showCredits, showHolidays, alwaysHolidaysSwitched, holidays
}) => {
    const holidaysArray =  Object.keys(holidays).filter(x => holidays[x]);
    return <ScrollView style={{flex: 1, backgroundColor: '#e3e5e8', paddingTop: 3}}>
        <Container onPress={requiredPicker.toggle}>
            <Label>{'Hours per Day'}</Label>
            <Stat>{ hoursPerDay.toString() }</Stat>
        </Container>
        <Container onPress={showHolidays.toggle}>
            <Label>{'Always Holiday'}</Label>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Holidays length={holidaysArray.length}>{ holidaysArray.join(', ') }</Holidays>
            </View>
        </Container>
        <Container onPress={quickActionModePressed}>
            <Label>{'Quick Action Buttons'}</Label>
            <Stat>{ smartQuickAction ? 'Smart' : 'Default' }</Stat>
        </Container>
        <Container onPress={showCredits.toggle}>
            <Label>{'Credits'}</Label>
            <Stat>{ 'Click' }</Stat>
        </Container>
        {requiredPicker.state ? <DateSelector visible={requiredPicker.state} onSubmit={requiredPerDaySet}
                                           onCancel={requiredPicker.toggle} currentDate={hoursPerDay}
                                           items={hours2.map((item, index) => <Picker.Item label={item} value={item} key={index}/>)}/> : null}
        <Credits visible={showCredits.state} onHide={showCredits.toggle}/>
        <HolidayPicker visible={showHolidays.state} onHide={showHolidays.toggle} daySwitched={alwaysHolidaysSwitched} holidays={holidays}/>
    </ScrollView>
};

const hours2 = ['7:00','7:15','7:30','7:45','8:00','8:15','8:30', '8:45', '9:00', '9:15', '9:30', '9:45', '10:00'];

const enhance = compose(
    connect(state => ({ ...state.settings}), { quickActionModePressed, requiredPerDaySet, alwaysHolidaysSwitched }),
    withToggle({propName: 'requiredPicker', toggleStates: [true, false], defaultState: false}),
    withToggle({propName: 'showCredits', toggleStates: [true, false], defaultState: false}),
    withToggle({propName: 'showHolidays', toggleStates: [true, false], defaultState: false}),
);
export default enhance(SettingsContainer);
const Label = styled.Text`
    fontSize: 20;
    fontWeight: bold;
    color: #696969;
`;

const Stat = styled.Text`
    fontSize: 18;
    fontWeight: bold;
`;

const Holidays = styled.Text`
    fontSize: ${props => props.length <= 2 ? 16 : props.length >=5 ? 11 : 13}
    flexWrap: wrap;
    fontWeight: bold;
    marginLeft: 5;
`;

const Container = styled.TouchableOpacity`
    background-color: white;
    borderWidth: ${StyleSheet.hairlineWidth * 3};
    borderLeftWidth: 0;
    borderColor: rgba(0, 0, 0, .2);
    alignSelf: stretch;
    align-items: center;
    paddingHorizontal: 25;
    justifyContent: space-between;
    height: 60;
    borderTopRightRadius: 30;
    borderBottomRightRadius: 30;
    marginRight: 20;
    marginVertical: 6;
    flex-direction: row;
`;