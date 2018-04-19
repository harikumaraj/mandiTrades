import React from 'react';
import { View, Text, ScrollView, Button, AsyncStorage } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';

import { persistor, store } from '../../store/store';
import styles from './styles';

export default class CustomDrawerContentComponent extends React.Component{

    componentDidMount(){
        // console.log(this.props.screenProps);
    }

    onPressLogout(screenProps){
        screenProps.navigateToAuthentication();
        AsyncStorage.setItem("navigateToProfileFlag", JSON.stringify(1));
        AsyncStorage.removeItem( "profilePicturePath" );
        persistor.purge();
        store.dispatch({
            type: 'RESET'
        })
    }

    render(){
        return(
            <ScrollView>
                <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <View style={{height:20,width:"100%"}}>
                        <Button title="logOut" onPress={()=> {this.onPressLogout(this.props.screenProps);}}/>
                    </View>
                    <DrawerItems {...this.props} />
                </SafeAreaView>
            </ScrollView>
        )
    }
}