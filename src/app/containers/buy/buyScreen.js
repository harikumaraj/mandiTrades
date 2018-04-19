import React from 'react';
import { View, Text, FlatList, Alert, ImageBackground, RefreshControl, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Loading from '../../../app/components/loading/loadingScreen';
import Header from '../../components/header/header';
import BuyCard from '../../components/buyCard/buyCard'
import styles from './styles';

import { fetchSellerList, updateBuyState, clearTimer, initialiseFetchTimer }  from '../../action/buyActions';

class Buy extends React.Component{

    constructor() {
        super();
        this.state={
            fetchSellerListPassedData:[0,100,"","","","",""], //from, to, commodityId, categoryId, minPrice, maxPrice, rating
            pullDownToRefresh: false
        };
    }

    componentDidMount(){
        this.props.fetchSellerList( this.props.buy, ...this.state.fetchSellerListPassedData );

    }

    componentWillUnmount(){
        this.props.clearTimer();
    }

    drawerToggle= ()=> {
        this.props.navigation.navigate("DrawerToggle");
    };

    navigateToHome= ()=>{
        this.props.navigation.navigate("home");
    };

    togglePullDownToRefresh(){
        setTimeout(()=>{this.setState({pullDownToRefresh: false});Alert.alert("poop","poops");
            setTimeout(()=>{console.log(this.state.pullDownToRefresh)})
        },3000);
    }

    render(){

        let {height,width}= Dimensions.get('window');

        return(
            <ImageBackground
                source={ require( "../../../assets/veggies.jpg" ) }
                blurRadius= { 5 }
                style={{flex:1}}
            >
                <Header
                    onPressLeftButton={ this.drawerToggle }
                    leftIcon={ () => <View style={styles.headerIconContainer}>
                        <Feather
                            name="menu"
                            size={35}
                            style={{color:"#ffffff"}}
                        />
                    </View>}
                    middleText={ "Seller List" }
                    onPressRightButton={ this.navigateToHome }
                    rightIcon={ () => <View style={styles.headerIconContainer}>
                        <MaterialIcons
                            name="home"
                            size={35}
                            style={{color:"#ffffff"}}
                        />
                    </View> }
                />
                <View style={styles.container}>
                    <Loading
                        size="large"
                        color="#ffffff"
                        animating={this.props.buy.loading}
                    />
                    <FlatList
                        contentContainerStyle={styles.flatListContainer}
                        initialNumToRender={4}
                        // refreshing={true}
                        refreshControl= {<RefreshControl
                            refreshing={this.state.pullDownToRefresh}
                            onRefresh={this.togglePullDownToRefresh.bind(this)}
                            title="Pull to refresh"
                            tintColor="#fff"
                            titleColor="#fff"
                            // colors={["red", "green", "blue"]}
                    />}
                        data={this.props.buy.sellerList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={( {item, index} )=>{
                            return <BuyCard
                                {...item}
                                imageURL={this.props.loadImages.imageURLs[item.commodityId]}
                                height={height}
                                phoneNumber={this.props.profile.phoneNumber}
                                index={index}
                            />
                        }}
                        ListHeaderComponent={()=><View style={{height:5}}/>}
                        ListFooterComponent={()=><View style={{height:5}}/>}
                        ItemSeparatorComponent={()=><View style={{height:5}}/>}
                    />
                </View>
            </ImageBackground>
        )
    }
}

function mapStateToProps(state){
    return {
        buy: state.buy,
        loadImages: state.loadImages,
        profile:state.profile
    };
}

export default connect( mapStateToProps, { fetchSellerList, updateBuyState, clearTimer, initialiseFetchTimer })( Buy );