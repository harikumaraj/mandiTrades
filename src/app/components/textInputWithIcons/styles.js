import EStyleSheet from 'react-native-extended-stylesheet';

export default styles= EStyleSheet.create({
   container:{
       flex:1,
       flexDirection: "row",
       // padding: 5,
       justifyContent: "center",
       alignItems: "center",
       backgroundColor:"yellow"
   },
    iconContainer:{
       width: "20%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"blue"
    },
    textInput:{
       width: "80%",
       height: "100%",
        justifyContent: "center",
        paddingLeft:5,
        backgroundColor:"green",
        color: "$white",
        fontSize: 15
    }
});