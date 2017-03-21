import React from 'react';
import { View, Modal, Linking, StyleSheet, Button, TouchableOpacity, Switch } from 'react-native';
import styled from 'styled-components/native';

const HolidaysPicker = ({visible, daySwitched, holidays, onHide}) =>
    <Modal visible={visible} animationType={'slide'} transparent={true}>
        <View style={{flex: 1}}>
            <TopView onPress={onHide}/>
            <DismissBox>
                <Button onPress={onHide} title={'DISMISS'} style={{textDecorationLine: 'underline'}}/>
            </DismissBox>
            <SwitchesBox>
                {Object.keys(holidays).map(day =>
                <SwitchRow key={day}>
                    <Text>{day}</Text>
                    <Switch onValueChange={() => daySwitched(day)} value={holidays[day]}/>
                </SwitchRow>)}
            </SwitchesBox>
        </View>
    </Modal>;

export default HolidaysPicker;

const SwitchesBox = styled.View`
    borderTopWidth: ${StyleSheet.hairlineWidth};
    borderColor: rgba(0, 0, 0, 0.2);
    backgroundColor: white;
`;

const TopView = styled.TouchableOpacity`
    flex: 1;
`;

const SwitchRow = styled.View`
    height: 60;
    alignSelf; stretch;
    borderTopWidth: ${StyleSheet.hairlineWidth};
    borderColor: rgba(0, 0, 0, 0.2);
    backgroundColor: white;
    padding: 15;
    flexDirection: row;
    justifyContent: space-between;
    alignItems: center;
`;

const DismissBox = styled.View`
    height: 40;
    borderTopWidth: ${StyleSheet.hairlineWidth};
    borderColor: rgba(0, 0, 0, 0.2);
    backgroundColor: white;
    alignItems: center;
    justifyContent: center;
`;

const Text = styled.Text`
    fontSize: 16;
    color: rgba(0,0,0,0.8);
`;
