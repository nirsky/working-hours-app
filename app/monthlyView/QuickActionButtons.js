import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { arrivedPressed, leftPressed } from 'infra/database/databaseActions';
import ArrivedImg from './images/arrived.png';
import LeftImg from './images/left.png';

const Footer = ({ arrivedPressed, leftPressed }) => {
    return <Container>
        <Arrived onPress={arrivedPressed}>
            <Image source={ArrivedImg} style={{ height: 20, width: 120}} resizeMode='contain'/>
        </Arrived>
        <Left onPress={leftPressed}>
            <Image source={LeftImg} style={{ height: 20, width: 100}} resizeMode='contain'/>
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
    height: 40;
    alignItems: center;
    justifyContent: center;
    backgroundColor: #c5f8c6;
    borderRightWidth: ${StyleSheet.hairlineWidth};
    borderBottomWidth: ${StyleSheet.hairlineWidth};
    borderTopWidth: 0;
    borderColor: rgba(0, 0, 0, .2);
`;

const Left = styled.TouchableOpacity`
    flex: 1;
    height: 40;
    alignItems: center;
    justifyContent: center;
    backgroundColor: lightblue;
    borderBottomWidth: ${StyleSheet.hairlineWidth};
    borderTopWidth: 0;
    borderColor: rgba(0, 0, 0, .2);
`;

const Container = styled.View`
    height: 40;
    flexDirection: row;
    backgroundColor: white;
`;