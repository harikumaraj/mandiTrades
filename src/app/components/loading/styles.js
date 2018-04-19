import EStyleSheet from  "react-native-extended-stylesheet";

export default EStyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        backgroundColor: "$greyTint",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 5
    },
    text:{
        color:"$white",
        marginTop: 10,
        fontSize: 20
    }
});