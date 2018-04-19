import EStyleSheet from 'react-native-extended-stylesheet';

export default Styles = EStyleSheet.create({
    outerContainer: {
        height:"100%",
        width:"100%",
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        alignItems:"center",
        justifyContent:"center"
    },
    innerBarContainer: {
        position:"absolute",
        left:0,
        height:"100%",
    },
    innerBar:{
        height:"100%",
        width:"100%",
    }

});