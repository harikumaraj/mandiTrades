import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    imageWrapper:{
        flex: 1
    },
    container:{
      flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    keyboardAvoidingView:{
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.3)",
    },
    textInput:{
        height: 40,
        width: "70%",
        backgroundColor: "rgba(255,255,255,0.8)",
        paddingLeft: 10,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15,
        color: "green",
        borderRadius: 5,
    },
    image:{
        width: "100%",
        height: "30%",
        marginBottom: 10,
    },
    name:{
        width: "100%",
        height: "5%",
        marginBottom: 10,
        // backgroundColor: "red"
    },
    button:{
        width: "70%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.8)",
        marginTop: 20,
        borderRadius: 5,
        // borderWidth: 5,
        // borderColor: "rgba(255,255,255,0.8)"
    },
    buttonText:{
        fontSize: 15,
        color: "rgb(165, 22, 0)",
    }
})