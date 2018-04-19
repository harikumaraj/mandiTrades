import  React from 'react';
import { Alert } from 'react-native';
import fetch from 'react-native-cancelable-fetch';

import { UPDATE_BUY_STATE } from './types';

let timerPointer= null;

export const updateBuyState= ( params )=> {
    return {
        type: UPDATE_BUY_STATE,
        payload:params
    }
};

export const clearTimer= ()=>{
    fetch.abort(1);
    clearTimeout(timerPointer);
    return {
        type: "CLEAR_TIME_OUT_AND_ABORT_FETCH",
    }
};

export const initialiseFetchTimer= ()=>{
    return function( dispatch, getState ){
        timerPointer=setTimeout(() => {
            fetch.abort(1);
            if (getState().buy.fetchFlag=== true)
                Alert.alert("Internet problem", "Could not load your details. Please connect to internet");
            dispatch(updateBuyState({
                loading: false,
                fetchFlag: false,
            }));
        }, 10000);
    }
};

export const fetchSellerList=( state, from, to, commodityId, categoryId, minPrice, maxPrice, rating )=>{

    let sellerListFormData= [
        {from:from},
        {to:to},
        {commodityId:commodityId},
        {categoryId:categoryId},
        {minPrice: minPrice},
        {maxPrice:maxPrice},
        {rating: rating}
    ];

    return function (dispatch) {

        dispatch(initialiseFetchTimer());

        dispatch({
            type: UPDATE_BUY_STATE,
            payload:{ loading: true, fetchFlag: true }
        });

        let formData = new FormData();

        sellerListFormData.map((data) => {
            formData.append(Object.keys(data)[0], Object.values(data)[0]);
        });

        fetch("http://prodapi.manditrades.com/MandiTrades/sellersList", {
            method: "POST",
            header: {
                accept: "application/json",
                "content-type": "application/x-www-form-urlencoded"
            },
            body: formData
        }, 1)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                dispatch(updateBuyState({
                    sellerList: response.data,
                    loading: false,
                    fetchFlag: false,
                }));
            })
            .catch((error) => {
                console.log(error);
                Alert.alert("Network error", "Make sure you are connected to internet.");
                dispatch(updateBuyState({
                    loading: false,
                    fetchFlag: false,
                }));
            });
    }
};