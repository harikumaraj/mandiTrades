import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Picker } from 'react-native-picker-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

export default class CustomPicker extends React.Component{

    render(){

        if( this.props.enabled=== true ) {
            return (
                <Picker
                    {...this.props}
                >
                    {
                        this.props.json.map((individualObject, index) =>
                            <Picker.Item key={index} label={individualObject.value} value={individualObject.value}/>
                        )
                    }
                </Picker>
            );
        }
        else{
            return(
                <View style={ [styles.picker, { flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }] }>
                    <Text style={ [styles.pickerText, { width:Platform.OS==="android"? "93%" :"96%", paddingHorizontal: Platform.OS==="android"? 8 : 0 }] }>
                        { this.props.selectedValue }
                    </Text>
                    <View style={{ width:Platform.OS==="android"? "7%" :"4%" }}>
                        <Ionicons
                            name="md-arrow-dropdown"
                            size={Platform.OS==="android"? 18 :25}
                            color= { Platform.OS==="android"? "#000000": "#ffffff" }
                        />
                    </View>
                </View>
            )
        }
    }
}