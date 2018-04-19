import { GET_PROFILE_FLAG, SET_PROFILE_FLAG } from './types';

export const getProfileFlag= ()=> {
    return {
        type: GET_PROFILE_FLAG
    }
};
export const setProfileFlag= ()=> {
    return {
        type: SET_PROFILE_FLAG
    }
};