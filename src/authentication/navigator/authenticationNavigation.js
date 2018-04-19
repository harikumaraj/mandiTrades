import React from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';

import LoginPage from '../containers/loginPage/loginPage'
import OtpPage from '../containers/otpPage/otpPage'

const Navigator = StackNavigator({
    login:{
        screen:LoginPage
    },
    otp:{
        screen:OtpPage
    }
});

export default class AuthenticationNavigator extends React.Component{

    navigateToMainApp= ( mobileNo )=>{

        let mainAppResetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'mainApp', params:{ mobileNo: mobileNo }})
            ]
        });

        this.props.navigation.dispatch(mainAppResetAction);
        this.props.screenProps.setNavigationFlag(2);
    };

    render(){
        return <Navigator screenProps={{
            navigateToMainApp:this.navigateToMainApp
        }}
        />
    }
}