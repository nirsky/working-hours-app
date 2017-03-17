import React, { Component } from 'react';
import { View, DatePickerIOS, Modal, Button } from 'react-native';
import { withState, compose, lifecycle } from 'recompose';

const TimePicker = ({ visible, onSubmit, onCancel, selectedTime, setSelectedTime }) =>
{
    const onChange = date => setSelectedTime(date);
    const onSetPress = () => {
        onSubmit(selectedTime.toString());
        onCancel();
    };

    return <Modal transparent animationType='fade' visible={visible}>
        <View style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'black', opacity: 0.5}}/>
            <View style={{alignSelf: 'stretch', height: 40, backgroundColor: 'white', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}}>
                <Button title="SET" onPress={onSetPress}/>
                <Button title="CANCEL" color="grey" onPress={onCancel}/>
            </View>
            <DatePickerIOS mode='time' date={selectedTime} onDateChange={onChange}
                           style={{backgroundColor: 'white', borderTopWidth: 2, borderColor: '#696969'}}/>
        </View>
    </Modal>
};

const enhance = compose(
    withState('selectedTime', 'setSelectedTime', props => props.currentTime ? new Date(props.currentTime) : new Date()),
    lifecycle({
        componentWillReceiveProps(nextProps) {
            if (nextProps.currentTime !== this.props.currentTime) {
                this.props.setSelectedTime(new Date(nextProps.currentTime))
            }
        }
    })
);

export default enhance(TimePicker);