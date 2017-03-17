import React, { Component } from 'react';
import { View, Picker, Modal, Button } from 'react-native';
import { withState, compose } from 'recompose';

const TimePicker = ({ visible, onSubmit, onCancel, selectedDate, setSelectedDate, items }) =>
{
    const onChange = date => setSelectedDate(date);
    const onSetPress = () => {
        onSubmit(selectedDate);
        onCancel();
    };

    return <Modal transparent animationType='fade' visible={visible}>
        <View style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'black', opacity: 0.5}}/>
            <View style={{alignSelf: 'stretch', height: 40, backgroundColor: 'white', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}}>
                <Button title="SET" onPress={onSetPress}/>
                <Button title="CANCEL" color="grey" onPress={onCancel}/>
            </View>
            <Picker selectedValue={selectedDate} onValueChange={onChange}
                    style={{backgroundColor: 'white', borderTopWidth: 2, borderColor: '#696969'}}>
                {items}
            </Picker>
        </View>
    </Modal>
};

const enhance = compose(
    withState('selectedDate', 'setSelectedDate', props => props.currentDate),
);

export default enhance(TimePicker);