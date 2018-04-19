import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { setProfileFlag, getProfileFlag } from '../../action/profilePageNavigationActions';
import { updateProfile, resetProfile } from '../../action/profileActions'
import Header from '../../components/header/header';
import HeaderLeftIcon from './headerLeftIcon';
import CustomImagePicker from '../../components/customImagePicker/customImagePicker';
import styles from './styles';
import TextInputWithIcon from '../../components/textInputWithIcons/textInputWithIcon';
import { states, occupation, farmingMechanism, gender, irrigation, landMeasuringUnit } from '../../components/profileJson';
import CustomPicker from './customPicker';

let placeHolderColor= "rgba(255,255,255,0.5)";
let underLineColor= "rgba(0,0,0,0)";

class Profile extends React.Component{
    constructor(){
        super();
        this.state={
            isDatePickerVisible: false,
            editable: false,
            headerRightButtonText: "Edit",
            leftButtonNavigationFlag: false
        };
    }

    _showDateTimePicker= () => { this.setState({ isDatePickerVisible: true }, ()=>{console.log(this.state)})};

    _hideDateTimePicker= () => { this.setState({ isDatePickerVisible: false })};

    _handleDatePicked= (date) => {
        console.log('A date has been picked: ', date.toLocaleString().slice(0,10));
        this.props.updateProfile( this.props.profile, { "dob": date.toLocaleString().slice(0,10) } );
        this._hideDateTimePicker();
    };

    pressRightButton= ()=> {
        if( this.state.editable=== true ){
            this.setState({ editable: false, headerRightButtonText: "edit" }); //the fields are made editable
        }
        else
            this.setState({ editable: true, headerRightButtonText: "save" }); //fields are made not editable
    };

    pressLeftButton= ()=> {
        if( Promise.resolve( this.props.profileFlag ) === this.props.profileFlag ) {
            this.props.profileFlag.then((response) => {
                this.setState({ leftButtonNavigationFlag: true });
                if (parseInt(response) === 1 || response === null) {
                    this.props.setProfileFlag();
                    this.props.navigation.navigate("home");
                }
                else {
                    this.props.navigation.navigate("DrawerToggle");
                }
            })
                .catch((error) => {
                    console.log(error)
                });
        }
        else{
            if( this.state.navigateToProfileFlag ) {
                this.props.navigation.navigate("home");
                this.props.setProfileFlag();
            }
            else
                this.props.navigation.navigate("DrawerToggle");
        }

    };

    render(){
        return(
            <View style={{flex:1}}>
                <Header
                    onPressLeftButton={ this.pressLeftButton }
                    leftIcon={ ()=> <HeaderLeftIcon passedProps={ this.props }/> }
                    middleText={ "Profile" }
                    onPressRightButton={ this.pressRightButton }
                    rightIcon={ () => <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>{ this.state.headerRightButtonText }</Text>
                    </View>
                    }
                />
                <View style={ styles.container }>
                    <View style={ styles.topView }>
                        <View style={ styles.profilePictureContainer }>
                            <CustomImagePicker/>
                        </View>
                        <View  style={ styles.textInputWithIconContainer }>
                            <View style={ styles.textInputTopView }>
                                <TextInputWithIcon
                                    editable={ this.state.editable }
                                    value= { this.props.profile.fullName }
                                    autoCapitalize={ "words" }
                                    underlineColorAndroid={ underLineColor }
                                    placeholder={ "full name" }
                                    placeholderTextColor={ placeHolderColor }
                                    onChangeText={ ( fullName )=> { this.props.updateProfile( this.props.profile, { "fullName": fullName } ); } }
                                    icon={ ()=>
                                        <Entypo name="user" size={30} color="#ffffff" />
                                    }
                                />
                            </View>
                            <View style={ styles.textInputTopView }>
                                <TextInputWithIcon
                                    editable={ this.state.editable }
                                    value={ this.props.profile.phoneNumber }
                                    underlineColorAndroid={ underLineColor }
                                    placeholder={ "mobile number" }
                                    placeholderTextColor={ placeHolderColor }
                                    onChangeText={ ( phoneNumber )=> { this.props.updateProfile( this.props.profile, { "phoneNumber": phoneNumber } );  } }
                                    icon={ ()=>
                                        <Entypo name="phone" size={30} color="#ffffff" />
                                    }
                                />
                            </View>
                        </View>
                    </View>
                    <View style={ styles.thinLine }/>
                    <View style={ styles.bottomView }>
                        <KeyboardAwareScrollView
                            keyboardShouldPersistTaps= { "always" }
                            style={ styles.scrollView }
                        >
                            <TextInput
                                style={ styles.textInputBottomView }
                                editable={ this.state.editable }
                                placeholder={ "email id" }
                                underlineColorAndroid={ underLineColor }
                                placeholderTextColor={ placeHolderColor }
                                value={ this.props.profile.email }
                                autoCorrect={ false }
                                autoCapitalize={ "none" }
                                onChangeText={ ( email )=> { this.props.updateProfile( this.props.profile, { "email": email } );  } }
                            />
                            <TextInput
                                style={ styles.textInputBottomView }
                                editable={ this.state.editable }
                                placeholder={ "door number / house name" }
                                underlineColorAndroid={ underLineColor }
                                placeholderTextColor={ placeHolderColor }
                                value={ this.props.profile.addressLine1 }
                                autoCorrect={ false }
                                autoCapitalize={ "sentences" }
                                onChangeText={ ( addressLine1 )=> { this.props.updateProfile( this.props.profile, { "addressLine1": addressLine1 } );  } }
                            />
                            <TextInput
                                style={ styles.textInputBottomView }
                                editable={ this.state.editable }
                                placeholder={ "area / street" }
                                underlineColorAndroid={ underLineColor }
                                placeholderTextColor={ placeHolderColor }
                                value={ this.props.profile.addressLine2 }
                                autoCorrect={ false }
                                autoCapitalize={ "sentences" }
                                onChangeText={ ( addressLine2 )=> { this.props.updateProfile( this.props.profile, { "addressLine2": addressLine2 } );  } }
                            />
                            <TextInput
                                style={ styles.textInputBottomView }
                                editable={ this.state.editable }
                                placeholder={ "town / city" }
                                underlineColorAndroid={ underLineColor }
                                placeholderTextColor={ placeHolderColor }
                                value={ this.props.profile.city }
                                autoCorrect={ false }
                                autoCapitalize={ "words" }
                                onChangeText={ ( city )=> { this.props.updateProfile( this.props.profile, { "city": city } );  } }
                            />
                            <CustomPicker
                                { ...this.props }
                                json={ states }
                                style={ styles.picker }
                                textStyle={ styles.pickerText }
                                enabled={ this.state.editable }
                                selectedValue={ this.props.profile.state }
                                onValueChange={( itemValue ) =>{ this.props.updateProfile( this.props.profile, { "state": itemValue } ); }}
                                prompt="Choose state, you are living in"
                            />
                            <CustomPicker
                                { ...this.props }
                                json={ occupation }
                                style={ styles.picker }
                                textStyle={ styles.pickerText }
                                enabled={ this.state.editable }
                                selectedValue={ this.props.profile.occupation }
                                onValueChange={( itemValue ) =>{ this.props.updateProfile( this.props.profile, { "occupation": itemValue } ); }}
                                prompt="Choose your occupation"
                            />
                            <View style={ styles.thinLine }/>
                            <View style={ styles.sectionLabelContainer }>
                                <Text style={ styles.sectionLabel }>
                                    Personal details
                                </Text>
                            </View>
                            <CustomPicker
                                { ...this.props }
                                json={ gender }
                                style={ styles.picker }
                                textStyle={ styles.pickerText }
                                enabled={ this.state.editable }
                                selectedValue={ this.props.profile.gender }
                                onValueChange={( itemValue ) =>{ this.props.updateProfile( this.props.profile, { "gender": itemValue } ); }}
                                prompt="Choose your gender"
                            />
                            <View>
                                <TouchableOpacity
                                    style={{ ...StyleSheet.flatten(styles.picker), alignItems:"flex-start", justifyContent:"center", paddingHorizontal:Platform.OS==="android"? 10 : 5 }}
                                    onPress={this._showDateTimePicker}>
                                    <Text style={ styles.datePickerText }>{ this.props.profile.dob }</Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    isVisible={this.state.isDatePickerVisible}
                                    onConfirm={this._handleDatePicked}
                                    onCancel={this._hideDateTimePicker}
                                />
                            </View>
                            <TextInput
                                style={ styles.textInputBottomView }
                                editable={ this.state.editable }
                                placeholder={ "family name" }
                                underlineColorAndroid={ underLineColor }
                                placeholderTextColor={ placeHolderColor }
                                value={ this.props.profile.familyName }
                                autoCorrect={ false }
                                autoCapitalize={ "words" }
                                onChangeText={ ( familyName )=> { this.props.updateProfile( this.props.profile, { "familyName": familyName } );  } }
                            />
                            <TextInput
                                style={ styles.textInputBottomView }
                                editable={ this.state.editable }
                                placeholder={ "language" }
                                underlineColorAndroid={ underLineColor }
                                placeholderTextColor={ placeHolderColor }
                                value={ this.props.profile.language }
                                autoCorrect={ false }
                                autoCapitalize={ "words" }
                                onChangeText={ ( language )=> { this.props.updateProfile( this.props.profile, { "language": language } );  } }
                            />
                            <View style={ styles.thinLine }/>
                            <View style={ styles.sectionLabelContainer }>
                                <Text style={ styles.sectionLabel }>
                                    Land details
                                </Text>
                            </View>
                            <CustomPicker
                                { ...this.props }
                                json={ landMeasuringUnit }
                                style={ styles.picker }
                                textStyle={ styles.pickerText }
                                enabled={ this.state.editable }
                                selectedValue={ this.props.profile.landMeasuringUnit }
                                onValueChange={( itemValue ) =>{ this.props.updateProfile( this.props.profile, { "landMeasuringUnit": itemValue } ); }}
                                prompt="Choose land measuring unit"
                            />
                            <TextInput
                                style={ styles.textInputBottomView }
                                editable={ this.state.editable }
                                placeholder={ "Land size" }
                                underlineColorAndroid={ underLineColor }
                                placeholderTextColor={ placeHolderColor }
                                value={ this.props.profile.landSize }
                                autoCorrect={ false }
                                autoCapitalize={ "words" }
                                onChangeText={ ( familyName )=> { this.props.updateProfile( this.props.profile, { "landSize": familyName } );  } }
                            />
                            <CustomPicker
                                { ...this.props }
                                json={ irrigation }
                                style={ styles.picker }
                                textStyle={ styles.pickerText }
                                enabled={ this.state.editable }
                                selectedValue={ this.props.profile.irrigation }
                                onValueChange={( itemValue ) =>{ this.props.updateProfile( this.props.profile, { "irrigation": itemValue } ); }}
                                prompt="Choose the irrigation type"
                            />
                            <CustomPicker
                                { ...this.props }
                                json={ farmingMechanism }
                                style={ styles.picker }
                                textStyle={ styles.pickerText }
                                enabled={ this.state.editable }
                                selectedValue={ this.props.profile.farmingMechanism }
                                onValueChange={( itemValue ) =>{ this.props.updateProfile( this.props.profile, { "farmingMechanism": itemValue } ); }}
                                prompt="Choose the farming strategy or mechanism"
                            />
                            <View style={ styles.thinLine }/>
                            <View style={ styles.sectionLabelContainer }>
                                <Text style={ styles.sectionLabel }>
                                    Land location details
                                </Text>
                            </View>
                            <CustomPicker
                                { ...this.props }
                                json={ states }
                                style={ styles.picker }
                                textStyle={ styles.pickerText }
                                enabled={ this.state.editable }
                                selectedValue={ this.props.profile.landLocationState }
                                onValueChange={( itemValue ) =>{ this.props.updateProfile( this.props.profile, { "landLocationState": itemValue } ); }}
                                prompt="Choose state, you are farming in"
                            />
                            <TextInput
                                style={ styles.textInputBottomView }
                                editable={ this.state.editable }
                                placeholder={ "district" }
                                underlineColorAndroid={ underLineColor }
                                placeholderTextColor={ placeHolderColor }
                                value={ this.props.profile.landDistrict }
                                autoCorrect={ false }
                                autoCapitalize={ "words" }
                                onChangeText={ ( landDistrict )=> { this.props.updateProfile( this.props.profile, { "landDistrict": landDistrict } );  } }
                            />
                            <TextInput
                                style={ styles.textInputBottomView }
                                editable={ this.state.editable }
                                placeholder={ "taluk" }
                                underlineColorAndroid={ underLineColor }
                                placeholderTextColor={ placeHolderColor }
                                value={ this.props.profile.landTaluk }
                                autoCorrect={ false }
                                autoCapitalize={ "words" }
                                onChangeText={ ( landTaluk )=> { this.props.updateProfile( this.props.profile, { "landTaluk": landTaluk } );  } }
                            />
                        </KeyboardAwareScrollView>
                    </View>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state){
    return {
        profileFlag:state.profileFlag,
        profile: state.profile
    };
}

export default connect( mapStateToProps, { setProfileFlag, getProfileFlag, updateProfile, resetProfile })( Profile );