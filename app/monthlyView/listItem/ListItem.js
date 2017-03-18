import React, { Component } from 'react';
import { View, ListView, Text, StyleSheet } from 'react-native';
import { compose, mapProps, withProps } from 'recompose';
import { connect } from 'react-redux';
import { arrivalSet, departureSet, dayTypeSet } from 'infra/database/databaseActions';
import { withToggle } from 'infra/toggle';
import { todayId } from 'infra/date-utils';
import { onDayTypePress } from './DayTypePicker';
import styled from 'styled-components/native';
import TimePicker from './TimePicker';

const ListItem = ({ data, arrivalPicker, departurePicker, arrivalSet, departureSet, dayTypeSet, isToday }) => {
    return <Container isToday={isToday}>
        <DateBox isToday={isToday}>
            <Text style={{fontWeight: 'bold'}}>{data.day}</Text>
        </DateBox>
        <Separator/>
        <DayNameBox>
            <Text style={{marginLeft: 10}}>{data.dayName}</Text>
            {data.total && isWork(data.dayType) ?
                <TotalHours negative={data.total.includes('0 >')}>
                    {data.total + " Total"}
                </TotalHours> : null}
        </DayNameBox>
        <Separator/>
        {isWork(data.dayType) ?
            <View style={{ flexDirection: 'row'}}>
                <TimeBox onPress={arrivalPicker.toggle}>
                    <Label>Arrival</Label>
                    {data.arrival ? <Text>{formatEventHour(data.arrival)}</Text> : null}
                </TimeBox>
                <Separator/>
                <TimeBox onPress={departurePicker.toggle}>
                    <Label>Departure</Label>
                    {data.departure ? <Text>{formatEventHour(data.departure)}</Text> : null}
                </TimeBox>
                <Separator/>
            </View> : null}
            <View style={{flex: 1}}>
        <DayTypeBox dayType={data.dayType} isToday={isToday}
                    onPress={() => onDayTypePress((dayType) => dayTypeSet(data.id,dayType), data.id)}>
            <Text style={{fontSize: 15}}>{data.dayType}</Text>
        </DayTypeBox>
            </View>
        <TimePicker visible={arrivalPicker.state}
                    message={`Set arrival time for ${data.dayName}, ${data.id}`}
                    currentTime={data.arrival}
                    onSubmit={(time) => arrivalSet(data.id,time)}
                    onCancel={arrivalPicker.toggle}/>
        <TimePicker visible={departurePicker.state}
                    message={`Set departure time for ${data.dayName}, ${data.id}`}
                    currentTime={data.departure}
                    onSubmit={(time) => departureSet(data.id,time)}
                    onCancel={departurePicker.toggle}/>
    </Container>};

const isWork = (dayType) => dayType === 'Working Day' || dayType.includes('Half');
const formatEventHour = (stringDate) => {
    const date = new Date(stringDate);
    let mins = date.getMinutes();
    mins = mins < 10 ? '0'+mins : mins;
    return `${date.getHours()}:${mins}`;
};

//TODO: update is today when app back from background
const enhance = compose(
    connect(state => ({database: state.database})),
    mapProps( props => ({
        data: { ...(props.data), ...props.database[props.data.id]}
    })),
    connect(null, { arrivalSet, departureSet, dayTypeSet }),
    withToggle({propName: 'arrivalPicker', toggleStates: [true, false], defaultState: false}),
    withToggle({propName: 'departurePicker', toggleStates: [true, false], defaultState: false}),
    withProps(ownProps => ({ isToday: ownProps.data.id === todayId() }))
);

export default enhance(ListItem);

const borderRadius = 30;

const TotalHours = styled.Text`
    color: ${props => props.negative ? '#ff9999' : 'black'}
    marginLeft: 10; 
    fontWeight: bold;
    fontStyle: italic;
    fontSize: 12;
`;

const Label = styled.Text`
   color: #696969; 
   fontSize: 10; 
   fontStyle: italic; 
`;

const TimeBox = styled.TouchableOpacity`
    width: 60;
    alignItems: center;
    justifyContent: center;
`;

const DayTypeBox = styled.TouchableOpacity`
    flex: 1;
    alignSelf: stretch;
    alignItems: center;
    justifyContent: center;
    borderTopRightRadius: ${props => props.isToday ? borderRadius-2 : borderRadius };
    borderBottomRightRadius: ${props => props.isToday ? borderRadius-2 : borderRadius };
    background-color: ${props => dayTypeToColor[props.dayType] ? dayTypeToColor[props.dayType] : 'white'};
`;

const DayNameBox = styled.View`
    width: 90;
    justifyContent: center;
`;

const Separator = styled.View`
    height: 45;
    width: ${StyleSheet.hairlineWidth};
    backgroundColor: rgba(0, 0, 0, .2);
`;

const DateBox = styled.View`
    width: 25;
    height: 45;
    justifyContent: center;
    alignItems: center;
`;

const Container = styled.View`
    background-color: white;
    shadowColor: black;
    shadowOffset: 0 0;
    shadowRadius: 1;
    shadowOpacity: 0.5;
    borderWidth: ${props => props.isToday ? 2 : 0};
    borderLeftWidth: 0;
    borderColor: gold;
    alignSelf: stretch;
    align-items: center;
    height: 45;
    borderTopRightRadius: ${borderRadius};
    borderBottomRightRadius: ${borderRadius};
    marginRight: 6;
    marginVertical: 3;
    flex-direction: row;
`;

const dayTypeToColor = {
    'Working Day': 'white',
    'Holiday': '#8fb4ef',
    'Sick Day': '#FFAF85',
    'Day Off': '#FFB5FD',
    'Half Day Off': '#FFEDFE',
    'Reserve Duty': '#A6C78D'
};