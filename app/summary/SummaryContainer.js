import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getDaysInMonth} from 'infra/date-utils';
import { compose, withProps } from 'recompose';
import { workingDays } from './calculators';
import styled from 'styled-components/native';

const SummaryContainer = ({data, hoursPerDay}) => {
    const { workDays, totalHours, dailyAverage, extra, daysOff, sickDays, holidays } = workingDays(data, hoursPerDay);
    return <ScrollView style={{flex: 1, backgroundColor: '#e3e5e8', paddingTop: 3}}>
        <Container>
            <Label>{'Work Days'}</Label>
            <Stat>{ workDays }</Stat>
        </Container>
        <Container>
            <Label>{'Total Hours'}</Label>
            <Stat>{ totalHours }</Stat>
        </Container>
        <Container>
            <Label>{'Daily Average'}</Label>
            <Stat>{ dailyAverage }</Stat>
        </Container>
        <Container>
            <Label>{'Extra'}</Label>
            <Stat>{ extra }</Stat>
        </Container>
        <Container style={{marginTop: 25}}>
            <Label>{'Sick Days'}</Label>
            <Stat>{ sickDays }</Stat>
        </Container>
        <Container>
            <Label>{'Days Off'}</Label>
            <Stat>{ daysOff }</Stat>
        </Container>
        <Container>
            <Label>{'Holidays'}</Label>
            <Stat>{ holidays }</Stat>
        </Container>
    </ScrollView>
};

const enhance = compose(
    connect(state => ({
        month: state.header.month,
        year: state.header.year,
        database: state.database,
        holidays: state.settings.holidays,
        hoursPerDay: parseInt(state.settings.hoursPerDay.split(':')[0]) + parseInt((state.settings.hoursPerDay.split(':')[1]))/60
    })),
    withProps(props => ({
        data: getDaysInMonth(props.month,props.year,props.holidays).map(day => ({...day, ...props.database[day.id]}))
    }))
);

export default enhance(SummaryContainer);

const Label = styled.Text`
    fontSize: 20;
    fontWeight: bold;
    color: #696969;
`;

const Stat = styled.Text`
    fontSize: 20;
    fontWeight: bold;
`;

const Container = styled.TouchableOpacity`
    background-color: white;
    borderWidth: ${StyleSheet.hairlineWidth * 3};
    borderRightWidth: 0;
    borderColor: rgba(0, 0, 0, .2);
    borderRightWidth: 0;
    alignSelf: stretch;
    align-items: center;
    paddingHorizontal: 25;
    justifyContent: space-between;
    height: 60;
    borderTopLeftRadius: 30;
    borderBottomLeftRadius: 30;
    marginLeft: 20;
    marginVertical: 6;
    flex-direction: row;
`;