import React from 'react';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { NavigationActions } from 'react-navigation';

import { AppWithNavigationState, store } from './store/store'

EStyleSheet.build({
    $lightGreen: "#00bf32",
    $white: "#ffffff",
    $greyBorder: "rgba(122,122,122,0.5)",
    $greyTint: "rgba(0,0,0,0.5)",
    $translucentWhite: "rgba(255,255,255,0.5)"
});

class MainApp extends React.Component {

    legalAgreementResetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'legalAgreement'})
        ]
    });

    navigateToLegalAgreement= ()=>{
        this.props.navigation.dispatch( this.legalAgreementResetAction );
        this.props.screenProps.setNavigationFlag(0);
    };

    authenticationResetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'authentication'})
        ]
    });

    navigateToAuthentication= ()=>{
        this.props.navigation.dispatch( this.authenticationResetAction );
        this.props.screenProps.setNavigationFlag(1);
    };

    componentDidMount(){
        // console.log((this.props.navigation.state.params===undefined));
        setTimeout(()=> {
            let navigationFlag = this.props.screenProps.fetchNavigationFlag();
            if (navigationFlag !== 2) {
                // console.log(navigationFlag);
                switch (navigationFlag) {
                    case 0:
                        this.navigateToLegalAgreement();
                        break;
                    case 1:
                        this.navigateToAuthentication();
                }
            }
        },1000);
    }

    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState
                    navigateToAuthentication={this.navigateToAuthentication}
                    mobileNo={(this.props.navigation.state.params===undefined)?"":this.props.navigation.state.params.mobileNo}
                />
            </Provider>
        );
    }
}

export default MainApp;