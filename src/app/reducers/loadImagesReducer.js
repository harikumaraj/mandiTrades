import React from 'react';
import { FETCH_IMAGES, IMAGE_LIST_LENGTH } from '../action/types'

let initialState={
    imageListLength:0, //0 is everything is loaded fine, 1 is error loading
    imageURLs:{}
};

export default ( state=initialState, action )=>{
    switch(action.type){
        case FETCH_IMAGES:
            return {...state, imageURLs:action.payload};
        case IMAGE_LIST_LENGTH:
            return {...state, imageListLength:action.payload};
        default:
            return state;
    }
}