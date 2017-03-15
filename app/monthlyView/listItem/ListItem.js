import React from 'react';
import { View, ListView, Text } from 'react-native';
import { compose, withProps } from 'recompose';
import styled from 'styled-components/native';

const ListItem = ({ data, holiday }) => <Container holiday={holiday}>
    <DateBox><Text style={{fontWeight: 'bold'}}>{data.day}</Text></DateBox>
    <Text style={{marginLeft: 10}}>{data.dayName}</Text>
    <Seperator/>
</Container>;


const enhance = compose(
    withProps(ownProps => ({
        holiday: ownProps.data.dayName === 'Friday' || ownProps.data.dayName === 'Saturday'
    }))
);
export default enhance(ListItem);

const Seperator = styled.View`
    position: absolute;
    marginLeft: 115;
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

const Container = styled.TouchableOpacity`
    background-color: ${props => props.holiday ? '#DDD' : 'white'};
    borderWidth: 0.5;
    borderColor: #696969;
    alignSelf: stretch;
    align-items: center;
    height: 40;
    flex-direction: row;
`;