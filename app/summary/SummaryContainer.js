import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getDaysInMonth} from 'infra/date-utils';
import { compose, withProps } from 'recompose';
import { workingDays } from './calculators';
import styled from 'styled-components/native';

const SummaryContainer = ({data}) => {
    const { workDays, totalHours, dailyAverage, extra, daysOff, sickDays, holidays } = workingDays(data);
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
        database: state.database
    })),
    withProps(props => ({
        data: getDaysInMonth(props.month,props.year).map(day => ({...day, ...props.database[day.id]}))
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
    shadowColor: black;
    shadowOffset: -1 1;
    shadowRadius: 2;
    shadowOpacity: 0.5;
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