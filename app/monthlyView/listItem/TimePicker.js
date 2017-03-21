import React, { Component } from 'react';
import { View, DatePickerIOS, Modal, Button, Text } from 'react-native';
import { withState, compose, lifecycle } from 'recompose';

const TimePicker = ({ visible, onSubmit, onCancel, onClear, selectedTime, setSelectedTime, message, initialTime }) =>
{
    const onChange = date => setSelectedTime(date);
    const onSetPress = () => {
        onSubmit(selectedTime.toString());
        onCancel();
    };
    const onClearPress = () => {
        onClear();
        onCancel();
    };

    return <Modal transparent animationType='fade' visible={visible}>
        <View style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'black', opacity: 0.5}}/>
            <View style={{alignSelf: 'stretch', height: 20, backgroundColor: 'white', alignItems: 'center'}}>
                <Text style={{color: '#696969'}}>{message}</Text>
            </View>
            <View style={{borderTopWidth: 0, borderColor: '#696969', alignSelf: 'stretch', height: 40, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Button title="CLEAR" color='red' onPress={onClearPress}/>
                </View>
                <View style={{flex: 1}}>
                    <Button title="SET" onPress={onSetPress} />
                </View>
                <View style={{flex: 1}}>
                    <Button title="CANCEL" color="#696969" onPress={onCancel}/>
                </View>
            </View>
            <DatePickerIOS mode='time' date={selectedTime} onDateChange={onChange}
                           style={{backgroundColor: 'white', borderTopWidth: 2, borderColor: '#696969'}}/>
        </View>
    </Modal>
};

const enhance = compose(
    withState('selectedTime', 'setSelectedTime', props => props.initialTime ? new Date(props.initialTime) : new Date()),
    lifecycle({
        componentWillReceiveProps(nextProps) {
            if (nextProps.initialTime !== this.props.initialTime) {
                this.props.setSelectedTime(new Date(nextProps.initialTime))
            }
        }
    })
);

export default enhance(TimePicker);