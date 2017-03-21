import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { arrivedPressed, leftPressed } from 'infra/database/databaseActions';
import { todayId } from 'infra/date-utils';
import ArrivedImg from './images/arrived.png';
import LeftImg from './images/left.png';

const Footer = ({ arrivedPressed, leftPressed, hideArrived, hideLeft, smartMode }) => {
    return !(hideArrived && hideLeft) ?
        <Container>
            {hideArrived ? null : <Arrived onPress={arrivedPressed}>
                    <Image source={ArrivedImg} style={{ height: 20, width: 120}} resizeMode='contain'/>
                </Arrived>}
            {hideLeft || (smartMode && !hideArrived) ? null : <Left onPress={leftPressed}>
                    <Image source={LeftImg} style={{ height: 20, width: 100}} resizeMode='contain'/>
                </Left> }
        </Container> : null;
};

export default connect(state => {
    const id = todayId();
    return {
        smartMode: state.settings.smartQuickAction,
        hideArrived: state.settings.smartQuickAction && state.database[id] && state.database[id].arrival,
        hideLeft: state.settings.smartQuickAction && state.database[id] && state.database[id].departure
    }
}, { arrivedPressed, leftPressed })(Footer);

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