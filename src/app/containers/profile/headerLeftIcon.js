import React from 'react';
import { View, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import styles from "./styles"

export default class HeaderLeftIcon extends React.Component {

    constructor(){
        super();
        this.state={
            reload:1
        }
    }

    componentDidMount() {
        this.props.passedProps.getProfileFlag();

        setTimeout(()=>{this.returnHeaderLeftIcon()},300);
    }

    headerLeftButton= ()=>{
      return null
    };

    returnHeaderLeftIcon() {
        this.props.passedProps.profileFlag.then((response) => {
            if ( parseInt(response) === 1 || response=== null ) {
                this.headerLeftButton=()=> <View style={styles.buttonContainer}>
                    <Text style={styles.skipButtonText}>Skip</Text>
                </View>;
                this.setState({reload:Math.random()});
            }
            else {
                this.headerLeftButton=()=> <View style={styles.iconContainer}>
                    <Feather
                        name="menu"
                        size={35}
                        style={{color: "#ffffff"}}
                    />
                </View>;
                this.setState({reload:Math.random()});
            }
        })
            .catch((error) => {
                console.log(error)
            });
    }

    render(){
        return this.headerLeftButton();
    }
}