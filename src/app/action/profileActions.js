import { UPDATE_PROFILE, PROFILE_RESET } from './types';

export const updateProfile= ( profile, update )=> {
    return {
        type: UPDATE_PROFILE,
        payload: {...profile, ...update }
    }
};

export const resetProfile= ()=> {
    return {
        type: PROFILE_RESET,
    }
};