import React from 'react';
import { View, Text, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import Header from '../../components/header/header';
import styles from './styles'

export default class About extends React.Component{

    constructor(){
        super();
        this.state={
            progress:0
        }
    }

    // componentDidMount() {
    //    this.timeIntervalRef=setInterval(()=>{this.setState({progress:this.state.progress+0.02}); console.log(this.state.progress)},1000)
    // }

    drawerToggle= ()=> {
        this.props.navigation.navigate("DrawerToggle");
    };

    // componentWillUnmount(){
    //     clearTimeout(this.timeIntervalRef);
    // }

    render(){

        return(
            <View style={{flex:1}}>
                <Header
                    onPressLeftButton={ this.drawerToggle }
                    leftIcon={ () => <View style={styles.iconContainer}>
                        <Feather
                            name="menu"
                            size={35}
                            style={{color:"#ffffff"}}
                        />
                    </View>}
                    middleText={ "About" }
                    onPressRightButton={ this.drawerToggle }
                    rightIcon={ () => null }
                />
                <View style={styles.container}>
                </View>
            </View>
        )
    }
}