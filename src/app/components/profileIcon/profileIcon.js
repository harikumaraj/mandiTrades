import React from 'react';
import { View, ImageBackground } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'

import styles from './styles'

export default class ProfileIcon extends React.Component{
    render(){
        return(
            <ImageBackground
            style={ styles.outerImage }
            source={ require( "../../../assets/profile.png" ) }
            blurRadius={3}
            >
                <View style={ styles.innerImageContainer }>
                    <Feather
                        name="plus"
                        size={100}
                        style={{color:"#ffffff"}}
                    />
                </View>
            </ImageBackground>
        )
    }
}