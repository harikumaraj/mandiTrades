import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import styles from "./styles"

export default class Loading extends React.Component{
    render(){
        if( this.props.animating===true ) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator
                        {...this.props}
                    />
                    <Text style={styles.text}>loading...</Text>
                </View>
            )
        }
        else
            return null
            // return <ActivityIndicator size="large" color="#0000ff" />
    }
}