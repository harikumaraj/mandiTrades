import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, UIManager, Platform, LayoutAnimation, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import fetch from 'react-native-cancelable-fetch';

import Loading from '../loading/loadingScreen';

import Styles from './styles';

let CustomLayoutSpring = {
    duration: 400,
    // create: {
    //     type: LayoutAnimation.Types.spring,
    //     property: LayoutAnimation.Properties.scaleXY,
    //     springDamping: 0.8,
    // },
    update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.8,
    },
};

export default class BuyCard extends React.Component{

    constructor(props){
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        this.state={
            mandiTradesURL:"http://prodapi.manditrades.com/Images/",
            detailsHeight: 0,
            expanded: false,
            rating:0,
            loading:false,
            fetchFlag:false,
            commentHeight:0,
            commentExpanded:false,
            commentActive:false
        }
    }

    componentDidMount(){
        console.log(this.props);
    }

    toggleDetailsViewHeight(){
        if(this.state.expanded)
            this.setState({expanded:false,detailsHeight:0});
        else
            this.setState({expanded:true,detailsHeight:this.props.height/1.8});
        LayoutAnimation.configureNext(CustomLayoutSpring);
    }

    toggleCommentViewHeight(){
        if(this.state.commentExpanded)
            this.setState({commentExpanded:false,commentHeight:0});
        else
            this.setState({commentExpanded:true,commentHeight:this.props.height/2});
        LayoutAnimation.configureNext(CustomLayoutSpring);
    }

    sellerRating(rating){
        this.setState({loading:true,fetchFlag:true,rating:rating});
        let formData=new FormData();
        formData.append("mobileNo",this.props.phoneNumber);
        formData.append("rating",rating);
        formData.append("postId",this.props.id.$id);
        fetch("http://192.168.1.42:8081/MandiTrades/sellerRating", {
            method: "POST",
            header: {
                accept: "application/json",
                "content-type": "application/x-www-form-urlencoded"
            },
            body: formData
        }, 1)
            .then((response) => response.json())
            .then((response) => {
                this.setState({loading:false,fetchFlag:false});
                console.log(response);
            })
            .catch((error) => {
                this.setState({loading:false,fetchFlag:false});
                console.log(error);
                Alert.alert("Network error", "Make sure you are connected to internet.");
            });
        setTimeout(() => {
            fetch.abort(1);
            if (this.state.fetchFlag=== true)
                Alert.alert("Internet problem", "Could not load your details. Please connect to internet");
            this.setState({loading: false, fetchFlag: false});
        }, 10000);
    }

    monthSwitch(monthInNumber){
        switch(monthInNumber){
            case 1: return "Jan";
            case 2: return "Feb";
            case 3: return "Mar";
            case 4: return "Apr";
            case 5: return "May";
            case 6: return "Jun";
            case 7: return "Jul";
            case 8: return "Aug";
            case 9: return "Sept";
            case 10: return"Oct";
            case 11: return "Nov";
            case 12: return "Dec";
            default: return "Dec";
        }
    }

    alterDateTimeArray(dateTime) {
        // let year=dateTime.substr(0,4);
        let monthInNumber=parseInt(dateTime.substr(5,2));
        let date= dateTime.substr(8,2);
        let time=dateTime.substr(11,5);
        let amPm=(parseInt(dateTime.substr(11,2))<12)?"am":"pm";
        let monthInWord=this.monthSwitch(monthInNumber);
        return(
            <Text style={Styles.textField}>{`${monthInWord} ${date} at ${time} ${amPm}`}</Text>
        )
    }


    displayStars=( stars )=>{

        let tempStar=[];

        for( let i=0; i<stars; i++ ){
            tempStar.push(<Ionicons key={i} name="ios-star" size={17} color="#000000" />);
        }
        for( let i=stars; i<5; i++ ){
            tempStar.push(<Ionicons key={i} name="ios-star-outline" size={17} color="#000000" />);
        }


        return(
            <View style={Styles.startContainer}>
                {tempStar}
                <Text> ({stars})</Text>
            </View>
        )
    };

    ratingView(){
        let rating=[];
        for(let i=0; i<this.state.rating; i++){
            rating.push(
                <Ionicons
                    key={i}
                    name="ios-star"
                    size={30}
                    color="#000000"
                    onPress={()=>{
                        this.sellerRating(i+1);
                    }}
                />
            )
        }
        for( let i=this.state.rating; i<5; i++ ){
            rating.push(
                <Ionicons
                    key={i}
                    name="ios-star-outline"
                    size={30}
                    color="#000000"
                    onPress={()=>{
                        this.sellerRating(i+1);
                    }}
                />
            )
        }
        return(
            <View style={{alignItems:"center"}}>
                <View style={{flexDirection:"row"}}>
                    {rating}
                </View>
                <Text>Rating</Text>
            </View>
        )
    }

    displayCommentView(){
        if(this.state.commentActive){
            return(
                <Text>Comment active true</Text>
            );
        }
        else return(
            <Text>Comment active false</Text>
        );
    }

    render(){
        return(
            <View style={[Styles.cardWrapper]}>
                <TouchableOpacity
                    style={[Styles.container, {height:this.props.height/5.3}]}
                    onPress={()=>{this.toggleDetailsViewHeight()}}
                >
                    <View style={Styles.leftContainer}>
                        <View style={Styles.imageContainer}>
                            <Image
                                style={{width: 100, height: 100}}
                                source={{uri:`data:image/png;base64,${this.props.imageURL}`}}
                            />
                            <Text style={Styles.varietyText}>variety: {this.props.vareityName}</Text>
                        </View>
                        <View style={Styles.rightContainer}>
                            <View style={Styles.textWrapper}>
                                <Entypo name="user" size={20} color="#000" />
                                <Text style={Styles.sellerNameText}>{(this.props.sellerName==="(null)")?"unknown user":this.props.sellerName}</Text>
                                <EvilIcons name="check" size={20} color="#000" />
                            </View>
                            {this.displayStars(this.props.rating)}
                            <View style={Styles.textWrapper}>
                                <EvilIcons name="clock" size={20} color="#000" />
                                {this.alterDateTimeArray(this.props.dateOfCreation.date)}
                            </View>
                            <View style={Styles.textWrapper}>
                                <FontAwesome name="truck" size={15} color="#000" />
                                <Text style={Styles.textField}> {this.props.quantity} kg available</Text>
                            </View>
                            <View style={Styles.textWrapper}>
                                <FontAwesome name="rupee" size={15} color="#000" />

                                <Text style={Styles.textField}> {this.props.price}.00 per kg</Text>
                            </View>
                            <View style={Styles.textWrapper}>
                                <FontAwesome name="rupee" size={15} color="#000" />
                                <Text style={Styles.textField}>total cost {this.props.quantity*this.props.price}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={[Styles.detailsView, {height:this.state.detailsHeight}]}>
                    {(this.state.expanded!==true)?null:<Loading
                        size="large"
                        color="#ffffff"
                        animating={this.state.loading}
                    />}
                    <View style={Styles.textWrapper}>
                        <EvilIcons name="clock" size={20} color="#000" />
                        <Text>Member since {this.props.memberSince.substr(8,2)}/{this.props.memberSince.substr(5,2)}/{this.props.memberSince.substr(0,4)}</Text>
                    </View>
                    <View style={Styles.textWrapper}>
                        <Entypo name="address" size={20} color="#000" />
                        <Text style={Styles.textField}>Address: {this.props.address}</Text>
                    </View>
                    {this.ratingView()}
                </View>
                <View style={[Styles.contactView,{height:this.props.height/17}]}>
                    <TouchableOpacity style={Styles.alignCenter}
                                      onPress={()=>{
                                          if(Platform.OS==="ios")
                                              Linking.openURL(`http://maps.apple.com/?ll=${this.props.latlong[0]},${this.props.latlong[1]}`);
                                          else
                                              Linking.openURL(`geo:${this.props.latlong[0]},${this.props.latlong[1]}`);
                                      }}
                    >
                        <SimpleLineIcons name="map" size={25} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.alignCenter}
                                      onPress={()=>{this.toggleCommentViewHeight(); this.setState({commentActive:false})}}
                    >
                        <SimpleLineIcons name="user" size={25} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.alignCenter}
                                      onPress={()=>{this.toggleCommentViewHeight(); this.setState({commentActive:true})}}
                    >
                        <SimpleLineIcons name="bubbles" size={25} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.alignCenter}
                                      onPress={()=>{Linking.openURL(`tel:${this.props.sellerMobile}`)}}
                    >
                        <SimpleLineIcons name="phone" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={[{backgroundColor:"#fff",height:this.state.commentHeight}]}>
                    {this.displayCommentView()}
                </View>
            </View>
        )
    }
}