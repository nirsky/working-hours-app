import React from 'react';
import { View, ListView, Text } from 'react-native';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { getDaysInMonth} from 'infra/date-utils';
import ListItem from './listItem/ListItem';
import Footer from './Footer';

const MonthlyViewContainer = ({ dataSource }) => {
    return <View style={{flex: 1}}>
        <ListView ref="scrollView"
            dataSource={dataSource}
            renderRow={(rowData) => <ListItem data={rowData}/>}
        />
        <Footer/>
    </View>
};

const enhance = compose(
    connect(state => ({ month: state.header.month, year: state.header.year})),
    withProps(ownProps => ({
        dataSource: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(getDaysInMonth(ownProps.month,ownProps.year))
    }))
);

export default enhance(MonthlyViewContainer);