import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

export default class Header extends Component{

    render(){
        const { onPressLeftButton, leftIcon, middleText, onPressRightButton, rightIcon } = this.props;

        return(
            <View  style= { styles.headerContainer }>
                <TouchableOpacity
                    style = { styles.leftContainer }
                    onPress = { onPressLeftButton }
                >
                    { leftIcon() }
                </TouchableOpacity>
                <View style= { styles.middleContainer }>
                    <Text style={styles.middleText}>{ middleText }</Text>
                </View>
                <TouchableOpacity
                    style = { styles.rightContainer }
                    onPress = { onPressRightButton }
                >
                    { rightIcon() }
                </TouchableOpacity>
            </View>
        )
    }
}