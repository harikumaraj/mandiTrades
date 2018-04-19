import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Platform } from 'react-native';

let {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
    buttonContainer:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.5,
        marginVertical: 15,
        marginHorizontal:3,
        borderColor: "$white",
        borderRadius: 20
    },
    container:{
        flex:1,
        marginVertical: 5,
        marginHorizontal:5,
        backgroundColor:"red"
    },
    buttonText:{
        color: "$white",
        fontSize:15
    },
    iconContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    skipButtonText:{
        color: "$white"
    },
    topView:{
        flex:1,
        flexDirection: "row",
        paddingBottom:5
    },
    bottomView:{
        flex:4,
        marginTop:5
    },
    textInputWithIconContainer:{
        flex:1,
        marginHorizontal: 5,
    },
    profilePictureContainer:{
        height: "100%",
        width: "30%",
    },
    textInputTopView:{
        flex:1,
        marginTop:5,
    },
    textInputBottomView:{
        height: 50,
        width: width-20,
        backgroundColor: "green",
        marginHorizontal: 5,
        marginBottom: 5,
        paddingHorizontal: Platform.OS==="android"? 10 : 5,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15,
        color: "$white"
    },
    picker:{
        height: 50,
        width: width-20,
        backgroundColor: "green",
        marginHorizontal:5,
        marginBottom:5,
        paddingHorizontal:Platform.OS==="android"? 0 : 5,
        justifyContent: "center",
    },
    scrollView:{
        height: "100%",
        width: "100%",
        backgroundColor:"blue"
    },
    pickerText:{
        color: "$white",
        fontSize: Platform.OS==="android"? 16 :15
    },
    thinLine:{
        width:"100%",
        borderBottomWidth: 1,
        borderBottomColor: "$white",
    },
    sectionLabelContainer:{
        width: "100%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        marginBottom: 5
    },
    sectionLabel:{
        color: "$white",
        fontWeight: "bold",
        fontSize: 17
    },
    datePickerText:{
        color: "$white",
        fontSize: 15
    }
})