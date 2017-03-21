import React, { Component } from 'react';
import { View, ListView, Text, StyleSheet } from 'react-native';
import { compose, mapProps, withProps } from 'recompose';
import { connect } from 'react-redux';
import { arrivalSet, departureSet, dayTypeSet, timeCleared, commentChanged } from 'infra/database/databaseActions';
import { withToggle } from 'infra/toggle';
import { todayId } from 'infra/date-utils';
import { onDayTypePress } from './DayTypePicker';
import styled from 'styled-components/native';
import Comment from './Comment';
import TimePicker from './TimePicker';

const ListItem = ({ data, arrivalPicker, departurePicker, commentToggle, commentChanged,
    arrivalSet, departureSet, dayTypeSet, timeCleared, isToday }) => {
    return <Container isToday={isToday}>
        <DateBox isToday={isToday}>
            <Text style={{fontWeight: 'bold'}}>{data.day}</Text>
        </DateBox>
        <Separator/>
        <DayNameBox onPress={commentToggle.toggle}>
            {data.comment && data.comment.text ?
            <View style={{position: 'absolute', top: 3, right: 3}}>
                <Text style={{fontSize: 10, backgroundColor: 'transparent'}}>{'🗨️'}</Text>
            </View>: null}
            <Text style={{marginLeft: 10, backgroundColor: 'transparent'}}>{data.dayName}</Text>
            {data.total && isWork(data.dayType) ?
                <TotalHours negative={data.total.includes('0 >')}>
                    {data.total + " Total"}
                </TotalHours> : null}
        </DayNameBox>
        {isWork(data.dayType) ? <Separator/> : null}
        {isWork(data.dayType) ?
            <View style={{ flexDirection: 'row', height: isToday ? 41 : 45}}>
                <TimeBox onPress={arrivalPicker.toggle}>
                    <Label>Arrival</Label>
                    {data.arrival ? <Text>{formatEventHour(data.arrival)}</Text> : null}
                </TimeBox>
                <Separator/>
                <TimeBox onPress={departurePicker.toggle}>
                    <Label>Departure</Label>
                    {data.departure ? <Text>{formatEventHour(data.departure)}</Text> : null}
                </TimeBox>
                {data.dayType !== 'Half Day Off' ? <Separator/> : null}
            </View> : null}
            <View style={{flex: 1}}>
        <DayTypeBox dayType={data.dayType} isToday={isToday}
                    onPress={() => onDayTypePress((dayType) => dayTypeSet(data.id,dayType), data.id)}>
            <Text style={{fontSize: 15}}>{data.dayType}</Text>
        </DayTypeBox>
            </View>
        <Comment visible={commentToggle.state}
                 onHide={commentToggle.toggle}
                 message={`Leave a comment for ${data.dayName}, ${data.id.replace(/-/g,'/')}`}
                 height={data.comment ? data.comment.height : 25}
                 text={data.comment ? data.comment.text : ''}
                 onChange={(text, height) => commentChanged(data.id, text, height)}/>
        {arrivalPicker.state ? <TimePicker visible={arrivalPicker.state}
                    message={`Set arrival time for ${data.dayName}, ${data.id.replace(/-/g,'/')}`}
                    initialTime={data.arrival}
                    onSubmit={(time) => arrivalSet(data.id,time)}
                    onClear={() => timeCleared(data.id, 'arrival')}
                    onCancel={arrivalPicker.toggle}/> : null}
        {departurePicker.state ? <TimePicker visible={departurePicker.state}
                    message={`Set departure time for ${data.dayName}, ${data.id.replace(/-/g,'/')}`}
                    initialTime={data.departure}
                    onSubmit={(time) => departureSet(data.id,time)}
                    onClear={() => timeCleared(data.id, 'departure')}
                    onCancel={departurePicker.toggle}/> : null}
    </Container>};

const isWork = (dayType) => dayType === 'Work Day' || dayType.includes('Half');
const formatEventHour = (stringDate) => {
    const date = new Date(stringDate);
    let mins = date.getMinutes();
    mins = mins < 10 ? '0'+mins : mins;
    return `${date.getHours()}:${mins}`;
};

//TODO: update is today when app back from background
const enhance = compose(
    connect((state, props) => ({database: state.database[props.data.id]})),
    mapProps( props => ({
        data: { ...(props.data), ...props.database }
    })),
    connect(null, { arrivalSet, departureSet, dayTypeSet, timeCleared, commentChanged }),
    withToggle({propName: 'arrivalPicker', toggleStates: [true, false], defaultState: false}),
    withToggle({propName: 'departurePicker', toggleStates: [true, false], defaultState: false}),
    withToggle({propName: 'commentToggle', toggleStates: [true, false], defaultState: false}),
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

const DayNameBox = styled.TouchableOpacity`
    width: 95;
    height: 50;
    justifyContent: center;
`;

const Separator = styled.View`
    marginVertical: 7;
    alignSelf: stretch;
    width: ${StyleSheet.hairlineWidth};
    backgroundColor: rgba(0, 0, 0, .2);
`;

const DateBox = styled.View`
    width: 25;
    height: 50;
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
    height: 50;
    borderTopRightRadius: ${borderRadius};
    borderBottomRightRadius: ${borderRadius};
    marginRight: 6;
    marginVertical: 3;
    flex-direction: row;
`;

const dayTypeToColor = {
    'Work Day': 'white',
    'Holiday': '#8fb4ef',
    'Sick Day': '#FFAF85',
    'Day Off': '#FFB5FD',
    'Half Day Off': '#FFEDFE',
    'Reserve Duty': '#A6C78D'
};