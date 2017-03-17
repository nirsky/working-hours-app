import React from 'react';
import { View, Button, Picker } from 'react-native';
import { compose } from 'recompose';
import { setYear, setMonth } from './state/headerActions';
import { connect } from 'react-redux';
import { withToggle } from 'infra/toggle';
import { months } from 'infra/date-utils';
import DateSelector from './DateSelector';

const years = ['2017','2018','2019','2020'];

const Header = ({ month, year, monthPicker, yearPicker, setYear, setMonth }) =>
    <View style={{height: 40, alignSelf: 'stretch', backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#DDD', flexDirection: 'row',
                  justifyContent: 'space-around'}}>
        <Button title={months[month]} onPress={monthPicker.toggle}/>
        <Button title={year.toString()} onPress={yearPicker.toggle}/>
        <DateSelector visible={monthPicker.state} onSubmit={setMonth}
                      onCancel={monthPicker.toggle} currentDate={month}
                      items={months.map((item, index) => <Picker.Item label={item} value={index} key={index}/>)}/>
        <DateSelector visible={yearPicker.state} onSubmit={setYear}
                      onCancel={yearPicker.toggle} currentDate={year}
                      items={years.map((item, index) => <Picker.Item label={item} value={parseInt(item)} key={index}/>)}/>
    </View>;


const enhance = compose(
    connect(state => ({month: state.header.month, year: state.header.year}), { setYear, setMonth }),
    withToggle({propName: 'monthPicker', toggleStates: [true, false], defaultState: false}),
    withToggle({propName: 'yearPicker', toggleStates: [true, false], defaultState: false}),
);

export default enhance(Header);

