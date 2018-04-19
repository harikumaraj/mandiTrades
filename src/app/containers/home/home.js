import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { getProfileFlag, setProfileFlag } from '../../action/profilePageNavigationActions';
import { updateProfile } from '../../action/profileActions'
import { updateBuyState }  from '../../action/buyActions';
import { getImages } from '../../action/loadingImagesAction';
import Header from '../../components/header/header';
import styles from './styles';

class Home extends React.Component{

    constructor(){
        super();
        this.state={
            navigateToProfileFlag:1
        }
    }

    componentDidMount(){
        AsyncStorage.getItem("phoneNumber",(err,result)=>{
            console.log(result);
            if(result!==null)
                this.props.updateProfile(this.props.profile, {"phoneNumber": result});
        });
        if(this.props.screenProps.mobileNo!=="") {
            console.log("yes",this.props.screenProps.mobileNo);
            AsyncStorage.setItem("phoneNumber",this.props.screenProps.mobileNo);
            this.props.updateProfile(this.props.profile, {"phoneNumber": this.props.screenProps.mobileNo});
        }



        this.props.getProfileFlag();
        this.props.getImages();
        setTimeout(()=>{this.props.profileFlag.then((response)=>{
            if( parseInt(response)=== 1 || response=== null ) {
                this.props.navigation.navigate( "profile" );
            }
        })
            .catch((error)=>{console.log(error)});
        });
    }

    drawerToggle= ()=> {
        this.props.navigation.navigate("DrawerToggle");
    };

    render(){
        return(
            <ImageBackground
                source={ require( "../../../assets/veggies.jpg" ) }
                blurRadius= { 5 }
                style={{flex:1}}>
                <Header
                    onPressLeftButton={ this.drawerToggle }
                    leftIcon={ () => <View style={styles.headerIconContainer}>
                        <Feather
                            name="menu"
                            size={35}
                            style={{color:"#ffffff"}}
                        />
                    </View>}
                    middleText={ "Home" }
                    onPressRightButton={ this.drawerToggle }
                    rightIcon={ () => <View style={styles.headerIconContainer}>
                        <Feather
                            name="menu"
                            size={35}
                            style={{color:"#ffffff"}}
                        />
                    </View> }
                />
                <View style={styles.container}>
                    <View style={[ styles.viewForFLexRow, styles.borderBottom ]}>
                        <TouchableOpacity
                            style={[ styles.iconContainer, styles.borderRight ]}
                            onPress={()=>{
                                this.props.navigation.navigate("buy");
                            }}
                        >
                            <EvilIcons
                                name= "cart"
                                size= {110}
                                color= "#ffffff"
                            />
                            <Text style={ styles.iconText }>Buy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ styles.iconContainer }>
                            <Ionicons
                                name= "ios-cash-outline"
                                size= {90}
                                color= "#ffffff"
                            />
                            <Text style={ styles.iconText }>Sell</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[ styles.viewForFLexRow, styles.borderBottom ]}>
                        <TouchableOpacity style={[ styles.iconContainer, styles.borderRight ]}>
                            <SimpleLineIcons
                                name= "bag"
                                size= {80}
                                color= "#ffffff"
                            />
                            <Text style={ styles.iconText }>Shop</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ styles.iconContainer }>
                            <SimpleLineIcons
                                name= "bell"
                                size= {80}
                                color= "#ffffff"
                            />
                            <Text style={ styles.iconText }>Price alert</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[ styles.viewForFLexRow, styles.borderBottom ]}>
                        <TouchableOpacity style={[ styles.iconContainer, styles.borderRight ]}>
                            <Ionicons
                                name= "md-cloud-outline"
                                size= {80}
                                color= "#ffffff"
                            />
                            <Text style={ styles.iconText }>Weather</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ [styles.iconContainer] }>
                            <EvilIcons
                                name= "cart"
                                size= {100}
                                color= "#ffffff"
                            />
                            <Octicons
                                name= "plus"
                                size= {27}
                                color= "#ffffff"
                                style={{ position: "absolute", top: "21%" }}
                            />
                            <Text style={ styles.iconText }>My demand</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[ styles.viewForFLexRow ]}>
                        <TouchableOpacity style={[ styles.iconContainer, styles.borderRight ]}>
                            <FontAwesome
                                name= "newspaper-o"
                                size= {80}
                                color= "#ffffff"
                            />
                            <Text style={ styles.iconText }>Mandi news</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ styles.iconContainer }>
                            <FontAwesome
                                name= "line-chart"
                                size= {70}
                                color= "#ffffff"
                            />
                            <Text style={ styles.iconText }>Mandi price</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.viewBottomLast }>
                        <Image
                            style={ styles.bottomImage }
                            source={ require( "../../../assets/data.gov.in.png" ) }
                        />
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

function mapStateToProps(state){
    return {
        profileFlag: state.profileFlag,
        profile: state.profile
    };
}

export default connect(mapStateToProps,{ getProfileFlag, setProfileFlag, updateBuyState, getImages, updateProfile })(Home);