import React from 'react';
import { TouchableOpacity, Image, AsyncStorage, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

import ProfileIcon from '../profileIcon/profileIcon'

export default class CustomImagePicker extends React.Component{

    constructor(){
        super();

        this.state={
            selectedFlag: 0,
            avatarSource: {}
        }
    }

    componentDidMount(){
        AsyncStorage.getItem( "profilePicturePath", ( error, profilePicturePath )=> {
            // console.log(JSON.parse(profilePicturePath));
                if( profilePicturePath!== null ) {
                    if ( Platform.OS=== "ios" ) {
                        this.setState({
                            avatarSource: {
                                uri: JSON.parse(profilePicturePath)
                            },
                            selectedFlag: 1
                        },()=>{console.log(this.state)});
                    }
                    else{
                        this.setState({
                            avatarSource: {
                                uri:"file://".concat(JSON.parse(profilePicturePath))
                        },
                            selectedFlag: 1
                        });
                    }
                }
            }
        )
    }

    displayProfileIcon(){
        if( this.state.selectedFlag=== 0 ){
            return <ProfileIcon />;
        }
        else {
            return <Image style={{height:"100%",width:"100%"}} source={ this.state.avatarSource }/>;
        }
    }

    invokeImagePicker( passedThis ){
        let options = {
            title: 'Select Avatar',
            customButtons: [
                {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                let pattern= "\/Documents";
                let position=response.uri.search(pattern);
                let localStorageUri= Platform.OS === 'ios' ?"~".concat(response.uri.substr(position)) :response.path;
                console.log(localStorageUri);
                AsyncStorage.setItem( "profilePicturePath", JSON.stringify(localStorageUri) );
                passedThis.setState({
                    avatarSource: source,
                    selectedFlag:1
                });
            }
        });
    }

    render(){
        return(
            <TouchableOpacity
                style={ styles.imageContainer }
                onPress={()=> {this.invokeImagePicker(this);} }
            >
                { this.displayProfileIcon() }
            </TouchableOpacity>
        );
    }
}