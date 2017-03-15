import React from 'react';
import { View, ListView, Text } from 'react-native';
import { compose, withProps } from 'recompose';
import { getDaysInMonth} from 'infra/date-utils';
import ListItem from './listItem/ListItem';

const MonthlyViewContainer = ({ dataSource }) => {
    return <ListView
        dataSource={dataSource}
        renderRow={(rowData) => <ListItem data={rowData}/>}
    />
};

const enhance = compose(
    withProps({
        dataSource: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(getDaysInMonth(2,2017))
    })
);

export default enhance(MonthlyViewContainer);