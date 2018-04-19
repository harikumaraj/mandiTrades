import React from 'react';
import { View, Text, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Styles from './styles';

export default class ProgressBar extends React.Component{

    constructor() {
        super();
        this.state = {
            width: `${50}%`
        }
    }

    render(){
        return(
            <LinearGradient colors={["#ffffff","#ffffff","#ffffff","#666666"]} style={Styles.outerContainer}>
                <View style={[Styles.innerBarContainer,{width:this.state.width}]}>
                    <LinearGradient colors={["#00bf32","#00bf32","#00bf32","#666666"]} style={Styles.innerBar}/>
                </View>
                <Text style={{position:"absolute",left:"45%"}}>{this.state.width}</Text>
            </LinearGradient>
        )
    }
}