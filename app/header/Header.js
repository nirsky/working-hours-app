import React from 'react';
import { View, Button, Picker, Image, StyleSheet } from 'react-native';
import { compose } from 'recompose';
import { setYear, setMonth } from './state/headerActions';
import { connect } from 'react-redux';
import { withToggle } from 'infra/toggle';
import { months } from 'infra/date-utils';
import DateSelector from './DateSelector';
import Logo from './images/logo.png';

const Header = ({ month, year, monthPicker, yearPicker, setYear, setMonth }) =>
    <View style={{
        height: 60,
        paddingTop: 20,
        alignSelf: 'stretch',
        backgroundColor: '#f4f4f4',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(0, 0, 0, .2)',
        flexDirection: 'row',
        justifyContent: 'space-around'}}>
        <View style={{flex: 2}}>
            <Button title={months[month]} onPress={monthPicker.toggle} />
        </View>
        <Image source={Logo} style={{height: 38, flex: 3}} resizeMode="contain"/>
        <View style={{flex: 2}}>
            <Button title={year.toString()} onPress={yearPicker.toggle}/>
        </View>
        {monthPicker.state ? <DateSelector visible={monthPicker.state} onSubmit={setMonth}
                      onCancel={monthPicker.toggle} currentDate={month}
                      items={months.map((item, index) => <Picker.Item label={item} value={index} key={index}/>)}/> : null}
        {yearPicker.state ? <DateSelector visible={yearPicker.state} onSubmit={setYear}
                      onCancel={yearPicker.toggle} currentDate={year}
                      items={years.map((item, index) => <Picker.Item label={item} value={parseInt(item)} key={index}/>)}/> : null}
    </View>;

const years = ['2017','2018','2019','2020','2021','2022','2023'];


const enhance = compose(
    connect(state => ({month: state.header.month, year: state.header.year}), { setYear, setMonth }),
    withToggle({propName: 'monthPicker', toggleStates: [true, false], defaultState: false}),
    withToggle({propName: 'yearPicker', toggleStates: [true, false], defaultState: false}),
);

export default enhance(Header);

