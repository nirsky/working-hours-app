import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { arrivedPressed, leftPressed } from 'infra/database/databaseActions';

const Footer = ({ arrivedPressed, leftPressed }) => {
    return <Container>
        <Arrived onPress={arrivedPressed}>
            <ArriveText>ARRIVED</ArriveText>
        </Arrived>
        <Left onPress={leftPressed}>
            <LeftText>LEFT</LeftText>
        </Left>
    </Container>
};



export default connect(null, { arrivedPressed, leftPressed })(Footer);

const ArriveText = styled.Text`
    fontSize: 17;
    fontWeight: bold;
    color: green;
`;

const LeftText = styled.Text`
    fontSize: 17;
    fontWeight: bold;
    color: blue;
`;

const Arrived = styled.TouchableOpacity`
    flex: 1;
    alignItems: center;
    justifyContent: center;
    backgroundColor: lightgreen;
`;

const Left = styled.TouchableOpacity`
    flex: 1;
    alignItems: center;
    justifyContent: center;
    backgroundColor: lightblue;
`;

const Container = styled.View`
    height: 50;
    flexDirection: row;
    alignSelf: stretch;
    backgroundColor: white;
`;