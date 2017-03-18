import React from 'react';
import { View, Text, ListView } from 'react-native';
import { compose, withProps } from 'recompose';
import { doneScrolling } from 'app/header/state/headerActions';
import { connect } from 'react-redux';
import { getDaysInMonth} from 'infra/date-utils';
import DaysList from './DaysList';
import QuickActionButtons from './QuickActionButtons';

const MonthlyViewContainer = ({ dataSource, scroll, doneScrolling }) => {
    return <View style={{flex: 1}}>
        <QuickActionButtons/>
        <DaysList dataSource={dataSource} scroll={scroll} doneScrolling={doneScrolling}/>
    </View>
};

const enhance = compose(
    connect(state => ({
        month: state.header.month,
        year: state.header.year,
        scroll: state.header.scroll
    }), { doneScrolling }),
    withProps(ownProps => ({
        dataSource: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(getDaysInMonth(ownProps.month,ownProps.year))
    }))
);

export default enhance(MonthlyViewContainer);