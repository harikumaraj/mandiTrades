import { Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    container:{
        height: Platform.OS === 'ios' ? "91%" : "92%",
        width: "100%"
    },
    headerIconContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    flatListContainer:{
        paddingHorizontal: 5,
    }
})