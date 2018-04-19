import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, KeyboardAvoidingView,
    Keyboard, Platform, TouchableWithoutFeedback, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import fetch from 'react-native-cancelable-fetch';

import Loading from '../../../app/components/loading/loadingScreen';

import styles from './styles';

let placeHolderColor= "rgba(0, 191, 50, 1)";
let underLineColor= "rgba(0,0,0,0)";

export default class LoginPage extends React.Component{

    static navigationOptions = {
        title: "Login",
        headerStyle: { backgroundColor: "rgba(0, 191, 50, 1)" },
        headerTitleStyle: { color: "#ffffff", fontSize: 22, textAlign: 'center', alignSelf: 'center' }

    };

    constructor(){
        super();
        this.state= {
            deviceId: "",
            mobileNo: "",
            loading: false,
            fetchFlag: false
        };
    }

    componentDidMount(){
        this.setState({deviceId: DeviceInfo.getUniqueID()});
    }

    getRegistration() {
        if (this.state.mobileNo.length === 10 || this.state.mobileNo.length === 12) {

            this.setState({loading: true, fetchFlag: true});

            let formData = new FormData();

            formData.append("deviceId", this.state.deviceId);

            formData.append("mobileNo", this.state.mobileNo);

            fetch('http://prodapi.manditrades.com/MandiTrades/getRegistration', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                },
                body: formData,
            }, 1)
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    // console.log(response.data[0].Device[" Status"]);
                    this.setState({ loading: false, fetchFlag: false });
                    if (response.statusCode === 200) {
                        if( response.data[0]["Device Status"]=== "Active" )
                            this.navigateToMainApp();
                        else
                        this.navigateToOtpScreen();
                    }
                })
                .catch(() => {
                    this.setState({ loading: false, fetchFlag: false });
                    Alert.alert("Network error","Make sure you are connected to internet.");
                });

            setTimeout(()=>{
                fetch.abort(1);
                this.setState({loading: false});
                if(this.state.fetchFlag)
                    setTimeout(()=>{Alert.alert("Internet problem", "Could not communicate with server. Please connect to internet.")});
                this.setState({fetchFlag: false});
            },10000);
        }
        else {
            Alert.alert("Input error","Please make sure you have entered the correct mobile number!");
        }
    }

    navigateToOtpScreen= () => {
        this.props.navigation.navigate({routeName: "otp", params: { mobileNo:this.state.mobileNo } });
    };

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
                                placeholder={ "Phone number" }
                                keyboardType={ "numeric" }
                                autoFocus={ false }
                                maxLength = {12}
                                underlineColorAndroid={ underLineColor }
                                placeholderTextColor={ placeHolderColor }
                                autoCorrect={ false }
                                autoCapitalize={ "words" }
                                onChangeText={ ( data )=> { this.setState({ mobileNo: data }) } }
                            />
                            <TouchableOpacity
                                style={ styles.button }
                                onPress= {()=>{
                                    // this.navigateToOtpScreen();
                                    // console.log(this.state);
                                    this.getRegistration();
                                }}
                            >
                                <Text style={ styles.buttonText }> Get OTP / Validate </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}