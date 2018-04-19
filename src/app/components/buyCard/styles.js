import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    cardWrapper:{
        width: "100%",
        borderRadius:4,
        overflow: "hidden"
    },
    container:{
        width:"100%",
        backgroundColor:"$white"
    },
    leftContainer:{
        flex:4,
        flexDirection:"row",
        overflow: "visible",
    },
    contactView:{
        flex:1,
        flexDirection:"row",
        backgroundColor:"$lightGreen"
    },
    imageContainer:{
        flex:1.3,
        overflow: "visible",
    },
    rightContainer:{
        flex:2,
        justifyContent:"center",
    },
    textWrapper:{
        flexDirection:"row",
        alignItems:"center"
    },
    varietyText:{
        fontSize:10,
        color:"#000"
    },
    sellerNameText:{
    },
    textField:{
        fontSize:13,
    },
    startContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    detailsView:{
        width:"100%",
        backgroundColor:"$white"
    },
    alignCenter:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})