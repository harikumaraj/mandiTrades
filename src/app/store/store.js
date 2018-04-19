import React from 'react';
import { BackHandler } from "react-native";
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxReset from 'redux-reset';

import MainAppNavigator from '../navigator/mainAppNavigator';
import appReducer from '../reducers/combineReducer';

const middleware = createReactNavigationReduxMiddleware(
    "app",
    state => state.nav,
);
const addListener = createReduxBoundAddListener("app");

class App extends React.Component {

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.routes[0].index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {

        let { dispatch, nav, navigateToAuthentication, mobileNo } = this.props;

        return (
            <MainAppNavigator
                screenProps={{navigateToAuthentication: navigateToAuthentication,mobileNo:mobileNo}}
                navigation={
                addNavigationHelpers({
                    dispatch: dispatch,
                    state: nav,
                    addListener,
                })
            }
            />
        );
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['nav',"buy.loading","buy.fetchFlag"]
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const enHanceCreateStore = compose(
    applyMiddleware( middleware, logger, thunk ),
    reduxReset()
)(createStore);

const store = enHanceCreateStore(persistedReducer);

let persistor = persistStore(store);

export { AppWithNavigationState, store, persistor }