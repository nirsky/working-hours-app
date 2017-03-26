import React from 'react';
import { View, Modal, Linking, StyleSheet, Button, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';

const Comment = ({visible, onHide, text, height, onChange, message}) => {
    const onChangeEvent = ({ nativeEvent: { contentSize: {height}, text } }) => {
        onChange(text, height)
    };
    return <Modal visible={visible} animationType={'slide'} transparent={true}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
            <TopView onPress={onHide}/>
            <View style={{alignSelf: 'stretch', height: 25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',
                            borderTopWidth: StyleSheet.hairlineWidth, borderColor:'rgba(0, 0, 0, 0.2)'}}>
                <Text style={{color: '#0C42FD', fontWeight: 'bold'}}>{message}</Text>
            </View>
            <InputBox height={height || 25} >
                <TextInput onChange={onChangeEvent}
                           style={{color: '#696969', height, fontSize: 20, flex: 1}}
                           multiline
                           placeholder={'...️'}
                           onChangeText={onChange} value={text}/>
            </InputBox>
        </KeyboardAvoidingView>
    </Modal>
};

export default Comment;
const InputBox = styled.View`
    padding: 10;
    minHeight: ${props => props.height + 20}
    borderTopWidth: ${StyleSheet.hairlineWidth};
    borderColor: rgba(0, 0, 0, 0.2);
    backgroundColor: white;
`;

const TopView = styled.TouchableOpacity`
    flex: 1;
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
