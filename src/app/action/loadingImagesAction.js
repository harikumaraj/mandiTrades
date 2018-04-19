import React from 'react';
import RNFetchBlob from 'react-native-fetch-blob'

import { imageURL } from '../components/imageURL';
import { FETCH_IMAGES, IMAGE_LIST_LENGTH } from '../action/types';

export const getImages=()=>{

    return function(dispatch, getState){

        setTimeout(()=> {

            console.log(getState().loadImages.imageListLength, "imageListLength");

            if (imageURL.length !== getState().loadImages.imageListLength) {

                let imageList = {}, imageURLLength = imageURL.length, imageListLength = 0;

                imageURL.map((commodity) => {
                    RNFetchBlob.fetch("GET", `http://prodapi.manditrades.com/Images/${commodity.imageURL}`)
                        .then((response) => {
                            imageList[commodity.commodityId] = response.base64();
                            imageListLength = imageListLength + 1;
                            // console.log(imageListLength);

                            if (imageListLength === imageURLLength) {
                                dispatch({
                                    type: FETCH_IMAGES,
                                    payload: imageList
                                });
                                dispatch({
                                    type: IMAGE_LIST_LENGTH,
                                    payload: imageListLength
                                })
                            }
                        })
                        .catch(() => {
                            dispatch({
                                type: IMAGE_LIST_LENGTH,
                                payload: imageListLength
                            })
                        })
                })
            }
        },200);
    }
};
