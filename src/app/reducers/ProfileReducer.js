import React from 'react';

import { UPDATE_PROFILE, PROFILE_RESET } from "../action/types"

let initialState= {
    fullName: "",
    phoneNumber: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "Select state",
    occupation: "Select occupation",
    dob: "Date of birth",
    gender: "Select gender",
    familyName: "",
    language: "",
    landMeasuringUnit: "Select land measuring unit",
    landSize: "",
    irrigation: "Select irrigation",
    farmingMechanism: "Select type of farming",
    landLocationState: "Select state",
    landDistrict: "",
    landTaluk: ""
};

export default ( state= initialState, action )=> {
    switch( action.type ){
        case UPDATE_PROFILE:
            return action.payload;
        case PROFILE_RESET:
            return initialState;
        default:
            return state;
    }
}