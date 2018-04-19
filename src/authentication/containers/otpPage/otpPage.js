import React from 'react';
import {
    View, Text, TextInput, TouchableOpacity, ImageBackground, Image,
    KeyboardAvoidingView, Keyboard, Platform, TouchableWithoutFeedback, Alert
} from 'react-native';
import fetch from 'react-native-cancelable-fetch';
import DeviceInfo from 'react-native-device-info';

import Ionicons from 'react-native-vector-icons/Ionicons'

import styles from './styles';
import Loading from '../../../app/components/loading/loadingScreen';

let placeHolderColor= "rgba(0, 191, 50, 1)";
let underLineColor= "rgba(0,0,0,0)";

export default class LoginPage extends React.Component{

    static navigationOptions =({navigation})=> {

        return {
            title: "OTP verification",
            headerStyle: {backgroundColor: "rgba(0, 191, 50, 1)"},
            headerTitleStyle: {color: "#ffffff", fontSize: 18},
            headerTintColor: "#ffffff",
            headerLeft: () => {
                return <TouchableOpacity
                    style={{ height: "100%", width:40, alignItems: "center", justifyContent: "center" }}
                    onPress={()=>{navigation.goBack(null)}}
                >
                <Ionicons
                    name="ios-arrow-back"
                    size={30}
                    color="#ffffff"
                />
                </TouchableOpacity>
            }
        }
    };

    constructor(){
        super();
        this.state= {
            deviceId: "",
            mobileNo: "",
            otp: "",
            loading: false,
            fetchFlag: false
        };
    }

    componentDidMount(){
        this.setState({mobileNo: this.props.navigation.state.params.mobileNo, deviceId: DeviceInfo.getUniqueID()});
    }

    getRegistration(){

        this.setState({ loading: true, fetchFlag: true});

        let formData = new FormData();

        formData.append( "mobileNo", this.state.mobileNo );

        formData.append( "deviceId", this.state.deviceId );

        formData.append( "otp", this.state.otp );

        fetch('http://prodapi.manditrades.com/MandiTrades/otpVerification', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        }, 1)
            .then((response)=>response.json())
            .then((response)=>{
            console.log(response);
                this.setState({ loading: false, fetchFlag: false });
                if (response.statusCode === 200)
                    this.navigateToMainApp();
                else
                    Alert.alert("Invalid OTP", "Try again!")
            })
            .catch((error)=>{
                this.setState({ loading: false, fetchFlag: false });
                console.log(error);
            });

        setTimeout(()=>{
            fetch.abort(1);
            this.setState({loading: false});
            if(this.state.fetchFlag)
                setTimeout(()=>{Alert.alert("Internet problem", "Could not communicate with server. Please connect to internet otp page")});
            this.setState({fetchFlag: false});
        },10000);
    }

    navigateToMainApp= ()=> {
        this.props.screenProps.navigateToMainApp(this.state.mobileNo);
    };

    render(){
        return(
            <ImageBackground
                source={ require("../../../assets/pineapple.jpg") }
                resizeMode={ "cover" }
                style={ styles.imageWrapper }
                blurRadius={ 5 }
            >
                <Loading
                    size="large"
                    color="#ffffff"
                    animating={this.state.loading}
                />
                <KeyboardAvoidingView behavior={ Platform.OS==="android"? null: "padding" } style={ styles.keyboardAvoidingView }>
                    <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                        <View style={ styles.container }>
                            <Image
                                source={ require("../../../assets/mandiTradesIcon.png") }
                                resizeMode={ "contain" }
                                style={ styles.image }
                            />
                            <Image
                                source={ require("../../../assets/mandiTradesName.png") }
                                resizeMode={ "contain" }
                                style={ styles.name }
                            />
                            <TextInput
                                style={ styles.textInput }
                                placeholder={ "Enter OTP" }
                                keyboardType={ "numeric" }
                                autoFocus={ false }
                                maxLength = {10}
                                underlineColorAndroid={ underLineColor }
                                placeholderTextColor={ placeHolderColor }
                                autoCorrect={ false }
                                autoCapitalize={ "words" }
                                onChangeText={ ( data )=> { this.setState({ otp: data }) } }
                            />
                            <TouchableOpacity
                                style={ styles.button }
                                onPress= { ()=>{ this.getRegistration(); } }
                            >
                                <Text style={ styles.buttonText }> Confirm OTP </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}