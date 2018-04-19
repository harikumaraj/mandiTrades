import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import Loading from '../components/loading/loadingScreen'

import Home from '../containers/home/home';
import About from '../containers/about/about';
import Profile from '../containers/profile/profile';
import Buy from '../containers/buy/buyScreen'
import CustomDrawerContentComponent from '../components/customDrawerContentComponent/CustomDrawerContentComponent';

export default MainAppNavigator = DrawerNavigator(
    {
        home:{
            screen:Home
        },
        profile:{
            screen:Profile
        },
        about:{
            screen:About
        },
        buy:{
            screen: Buy
        }
    },
    {
        contentComponent: CustomDrawerContentComponent
    });