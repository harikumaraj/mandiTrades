import React from 'react';

import { UPDATE_BUY_STATE } from '../action/types';

let initialState={
    loading: true,
    fetchFlag: true,
    sellerList:[]
};

export default ( state=initialState, action )=>{

    switch( action.type ){
        case UPDATE_BUY_STATE:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}