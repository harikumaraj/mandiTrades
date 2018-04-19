import React from 'react';
import { combineReducers } from 'redux';

import navReducer from './navReducer';
import profilePageNavigationReducer from './profilePageNavigationReducer';
import profileReducer from "./ProfileReducer";
import BuyReducer from './buyReducer';
import LoadImagesReducer from './loadImagesReducer'

const appReducer = combineReducers({
    nav: navReducer,
    profileFlag: profilePageNavigationReducer,
    profile: profileReducer,
    buy: BuyReducer,
    loadImages: LoadImagesReducer
});

export default appReducer;