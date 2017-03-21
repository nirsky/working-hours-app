import React from 'react';
import { View, Modal, Linking, StyleSheet, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export default ({visible, onHide}) =>
    <Modal visible={visible} animationType={'slide'} transparent={true}>
        <View style={{flex: 1}}>
            <TopView onPress={onHide}/>
            <DismissBox>
                <Button onPress={onHide} title={'DISMISS'} style={{textDecorationLine: 'underline'}}/>
            </DismissBox>
            <CreditsBox>
                <Text>App created and designed by Nir Hadassi.</Text>
                <Row style={{marginTop: 10}}>
                    <Text>Logo and Icons - </Text>
                    <HyperLink text="Freepik" link="http://www.freepik.com"/>
                </Row>
                <Row>
                    <Text>Calendar Icon - </Text>
                    <HyperLink text="Dave Gandy" link="http://www.flaticon.com/authors/dave-gandy"/>
                </Row>
                <Row>
                    <Text>Stat Icon - </Text>
                    <HyperLink text="SimpleIcon" link="http://www.flaticon.com/authors/simpleicon"/>
                </Row>
                <Row style={{marginTop: 10}}>
                    <Text>Icons from </Text>
                    <HyperLink text="Flaticon" link="http://www.flaticon.com"/>
                    <Text>, licensed by </Text>
                    <HyperLink text="'CC 3.0 BY'" link="http://creativecommons.org/licenses/by/3.0/"/>
                </Row>
                <Row>
                    <Text>Logo made with </Text>
                    <HyperLink text="Logo Maker" link="http://logomakr.com"/>
                </Row>
            </CreditsBox>
        </View>
    </Modal>

const CreditsBox = styled.View`
    padding: 10
    borderTopWidth: ${StyleSheet.hairlineWidth};
    borderColor: rgba(0, 0, 0, 0.2);
    backgroundColor: white;
`;

const TopView = styled.TouchableOpacity`
    flex: 1;
`;

const Row = styled.View`
    flexDirection: row;
`;

const DismissBox = styled.View`
    height: 40;
    borderTopWidth: ${StyleSheet.hairlineWidth};
    borderColor: rgba(0, 0, 0, 0.2);
    backgroundColor: white;
    alignItems: center;
    justifyContent: center;
`;

const Link = styled.Text`
    textDecorationLine: underline;
    color: #0C42FD;
    fontSize: 16;
`;

const Text = styled.Text`
    fontSize: 16;
    color: rgba(0,0,0,0.8);
`;

const HyperLink = ({text, link}) => <TouchableOpacity onPress={() => Linking.openURL(link)}>
    <Link>{ text }</Link>
</TouchableOpacity>;