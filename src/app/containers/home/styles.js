import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    container:{
        height: "100%",
        width: "100%"
    },
    headerIconContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    viewForFLexRow:{
        flex: 1,
        flexDirection: "row",
        backgroundColor: "rgba(255,255,255,0.2)"
    },
    viewBottomLast:{
        height: 120,
        width: "100%",
        paddingTop: 5,
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.7)"

    },
    iconContainer:{
      flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    iconText:{
        color: "$white",
        fontSize: 20
    },
    borderBottom:{
        borderBottomWidth: 0.5,
        borderBottomColor: "$white"
    },
    borderRight:{
        borderRightWidth: 0.5,
        borderRightColor: "$white"
    },
    bottomImage:{
        width: 150,
        height:50
    }
})