import React from 'react';
import { AppState } from 'react-native';

export default (withPropsFunction) => (BaseComponent)  =>
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                appState: AppState.currentState,
                mappedProps: withPropsFunction(props)
            }
        }
        componentDidMount() {
            AppState.addEventListener('change', this.handleAppStateChange);
        }
        componentWillUnmount() {
            AppState.removeEventListener('change', this.handleAppStateChange);
        }
        handleAppStateChange = (nextAppState) => {
            if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
                this.setState({appState: nextAppState, mappedProps: withPropsFunction(this.props)});
            }
            else {
                this.setState({appState: nextAppState});
            }
        };
        render() {
            return (
                <BaseComponent {...this.props} {...this.state.mappedProps}/>
            );
        }
    }
