import React, { Component } from 'react';
import { View, ListView, Text } from 'react-native';
import { compose, mapProps, withProps } from 'recompose';
import { connect } from 'react-redux';
import { arrivalSet, departureSet, dayTypeSet } from 'infra/database/databaseActions';
import { withToggle } from 'infra/toggle';
import { onDayTypePress } from './DayTypePicker';
import styled from 'styled-components/native';
import TimePicker from './TimePicker';

const ListItem = ({ data, arrivalPicker, departurePicker, arrivalSet, departureSet, dayTypeSet, isToday }) => {
    return <Container isToday={isToday}>
        <DateBox><Text style={{fontWeight: 'bold'}}>{data.day}</Text></DateBox>
        <DayNameBox>
            <Text style={{marginLeft: 10}}>{data.dayName}</Text>
            {data.total && isWork(data.dayType) ?
                <Text style={{marginLeft: 10,fontWeight: 'bold',fontStyle:'italic', fontSize: 11}}>{data.total + " Total"}</Text> : null}
        </DayNameBox>
        <Seperator/>
        {isWork(data.dayType) ?
            <View style={{ flexDirection: 'row'}}>
                <TimeBox onPress={arrivalPicker.toggle}>
                    <Label>Arrival</Label>
                    <Text>{data.arrival ? `${new Date(data.arrival).getHours()}:${new Date(data.arrival).getMinutes()}` : '00:00'}</Text>
                </TimeBox>
                <Seperator/>
                <TimeBox onPress={departurePicker.toggle}>
                    <Label>Departure</Label>
                    <Text>{data.departure ? `${new Date(data.departure).getHours()}:${new Date(data.departure).getMinutes()}` : '00:00'}</Text>
                </TimeBox>
                <Seperator/>
            </View> : null}
        <DayTypeBox dayType={data.dayType}
                    onPress={() => onDayTypePress((dayType) => dayTypeSet(data.id,dayType), data.id)}>
            <Text style={{fontSize: 15}}>{data.dayType}</Text>
        </DayTypeBox>
        <TimePicker visible={arrivalPicker.state}
                    currentTime={data.arrival}
                    onSubmit={(time) => arrivalSet(data.id,time)}
                    onCancel={arrivalPicker.toggle}/>
        <TimePicker visible={departurePicker.state}
                    currentTime={data.departure}
                    onSubmit={(time) => departureSet(data.id,time)}
                    onCancel={departurePicker.toggle}/>
    </Container>};

const isWork = (dayType) => dayType === 'Working Day' || dayType.includes('Half');

const enhance = compose(
    connect(state => ({database: state.database})),
    mapProps( props => ({
        data: { ...(props.data), ...props.database[props.data.id]}
    })),
    connect(null, { arrivalSet, departureSet, dayTypeSet }),
    withToggle({propName: 'arrivalPicker', toggleStates: [true, false], defaultState: false}),
    withToggle({propName: 'departurePicker', toggleStates: [true, false], defaultState: false}),
    withProps( ownProps => {
        const today = new Date();
        const todayId = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
        return { isToday: ownProps.data.id === todayId }
    })
);

export default enhance(ListItem);

const Label = styled.Text`
   color: #696969; 
   fontSize: 10; 
   fontStyle: italic; 
`;

const TimeBox = styled.TouchableOpacity`
    width: 60;
    height: 40;
    alignItems: center;
    justifyContent: center;
`;

const DayTypeBox = styled.TouchableOpacity`
    flex: 1;
    alignSelf: stretch;
    alignItems: center;
    justifyContent: center;
    background-color: ${props => dayTypeToColor[props.dayType] ? dayTypeToColor[props.dayType] : 'white'};
`;

const DayNameBox = styled.View`
    width: 90;
    height: 40;
    justifyContent: center;
`;

const Seperator = styled.View`
    height: 40;
    width: 1;
    backgroundColor: #696969;
`;

const DateBox = styled.View`
    width: 25;
    height: 40;
    justifyContent: center;
    alignItems: center;
    borderRightWidth: 1;
    borderColor: #696969;
`;

const Container = styled.View`
    background-color: white;
    shadowColor: black;
    shadowOffset: 0 0;
    shadowRadius: 1;
    shadowOpacity: 0.5;
    borderWidth: ${props => props.isToday ? 3 : 0};
    borderColor: gold;
    alignSelf: stretch;
    align-items: center;
    height: 40;
    borderRadius: 8;
    margin: 2;
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