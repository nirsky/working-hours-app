import React from 'react';
import { Text, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import { TabNavigator, addNavigationHelpers } from 'react-navigation';
import MonthlyView from 'app/monthlyView/MonthlyViewContainer';
import SummaryView from 'app/summary/SummaryContainer';


MonthlyView.navigationOptions = {
    tabBar: {
        label: 'Days',
        icon: ({ tintColor }) => <Image source={require('./images/calendar.png')}
                                        style={{tintColor: tintColor, width: 26, height: 26}}/>
    },
};

SummaryView.navigationOptions = {
    tabBar: {
        label: 'Summary',
        icon: ({ tintColor }) => <Image source={require('./images/summary.png')}
                                        style={{tintColor: tintColor, width: 26, height: 26}}/>
    }
};


const AppNavigator = TabNavigator(
    {
        MonthlyView: { screen: MonthlyView },
        Summary: { screen: SummaryView},
    },
    {
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            labelStyle: { fontSize: 12 }
        },
    });

const AppWithNavigationState = ({nav, dispatch }) =>
    <AppNavigator navigation={addNavigationHelpers({ dispatch: dispatch, state: nav})} />;

export const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

export default connect(state => ({ nav: state.nav}))(AppWithNavigationState);