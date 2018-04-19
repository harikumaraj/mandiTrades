import React from 'react';
import { AsyncStorage } from 'react-native';

import { GET_PROFILE_FLAG, SET_PROFILE_FLAG, SET_FLAG_SKIP_BUTTON } from '../action/types';

let initialState= { profileFlag: 1, skipButton: true };

export default profilePageNavigationReducer= ( state= 1, action ) => {
    switch( action.type ) {

        case GET_PROFILE_FLAG:
            return AsyncStorage.getItem("navigateToProfileFlag", (error, navigateToProfileFlag) => {
                if ( navigateToProfileFlag!== null )
                    return( parseInt(navigateToProfileFlag) );
                else return state;
            });

        case SET_PROFILE_FLAG:
            AsyncStorage.setItem("navigateToProfileFlag", JSON.stringify(0));
            return 0;

        default:
            return AsyncStorage.getItem("navigateToProfileFlag", (error, navigateToProfileFlag) => {
                if ( navigateToProfileFlag!== null )
                    return( parseInt(navigateToProfileFlag) );
                else return state;
            });
    }
}