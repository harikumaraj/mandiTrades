import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

import styles from './styles'

export default class LegalAgreement extends React.Component{

    authenticationResetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'authentication'})
        ]
    });

    navigateToAuthentication= (() => {
            this.props.navigation.dispatch(this.authenticationResetAction);
        this.props.screenProps.setNavigationFlag(1);
    });

    render(){
        return(
            <View style={styles.container}>
                <Text> Legal agreement </Text>
                <Button
                    onPress= {this.navigateToAuthentication}
                    title= "Go To Authentication"
                />
            </View>
        )
    }
}