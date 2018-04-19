import React from 'react';
import { View, TextInput } from 'react-native'

import styles from './styles';

export default class TextInputWithIcon extends React.Component{

    render(){
        return(
            <View style={ styles.container }>
                <View style={ styles.iconContainer }>
                    { this.props.icon() }
                </View>
                <TextInput
                style={ styles.textInput }
                autoCorrect={ false }
                { ...this.props }
                />
            </View>
        )
    }

}