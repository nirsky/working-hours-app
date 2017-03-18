//@flow
import React from 'react';
import { lifecycle } from 'recompose';
import { ListView } from 'react-native';
import ListItem from './listItem/ListItem';

type Props = {
    dataSource: any,
    scrollToDay: string,
    doneScrolling: () => void
}

const DaysList = ({ dataSource }: Props) =>
    <ListView ref="list"
              style={{backgroundColor: '#e3e5e8'}}
              dataSource={dataSource}
              renderRow={(rowData) => <ListItem data={rowData}/>}
    />;

const scrollToToday = lifecycle({
    componentWillReceiveProps(nextProps) {
        if (nextProps.scroll !== this.props.scroll && nextProps.scroll) {
            const offset = ( new Date().getDate() - 1 ) * 47;
            this.refs.list.scrollTo({y: offset, animated: true});
            this.props.doneScrolling();
        }
    }
});

export default scrollToToday(DaysList);