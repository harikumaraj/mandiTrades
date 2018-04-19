import { Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    headerContainer:{
        width:"100%",
        height: Platform.OS === 'ios' ? "9%" : "8%",
        paddingTop: Platform.OS === 'ios' ? "2%" : "0%",
        backgroundColor:"$lightGreen",
        flexDirection:"row",
    },
    leftContainer:{
        flex:1,
    },
    middleContainer:{
        flex:4,
        justifyContent:"center",
        alignItems:"center",
    },
    middleText:{
        color:"$white",
        fontSize:22
    },
    rightContainer:{
        flex:1,
    }
});