import React from 'react';
import { AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LegalAgreement from '../legalAgreement/legalAgreement';
import MainApp from '../app/mainApp';
import AuthenticationNavigator from '../authentication/navigator/authenticationNavigation';

const Navigator = StackNavigator({
        mainApp:{
            screen:MainApp
        },
        legalAgreement:{
            screen:LegalAgreement
        },
        authentication:{
            screen:AuthenticationNavigator
        }
    },
    {
        headerMode:'none',
    }
);

export default class RootNavigator extends React.Component{

    constructor(){
        super();
        this.state={
            navigationFlag:0
        }
    }

    componentDidMount(){
        this.loadNavigationFlag();
    }

    loadNavigationFlag= ()=> {
        AsyncStorage.getItem( "navigationFlag", ( error, navigationFlag )=> {
            let flag= parseInt( navigationFlag );
            // console.log(flag);
            if( flag ){
                this.setState({ navigationFlag: flag });
            }
        });
    };

    fetchNavigationFlag= () => {
        // console.log("executed",this.state.navigationFlag);
      return this.state.navigationFlag;
    };

    setNavigationFlag= (navigationFlag)=> {
        // console.log(navigationFlag);
        AsyncStorage.setItem( "navigationFlag", JSON.stringify(navigationFlag) );
      this.setState({
          navigationFlag:navigationFlag
      });
    };

    render(){
        return <Navigator screenProps={{
            fetchNavigationFlag: this.fetchNavigationFlag,
            setNavigationFlag: this.setNavigationFlag,
        }}
        />
    }
}