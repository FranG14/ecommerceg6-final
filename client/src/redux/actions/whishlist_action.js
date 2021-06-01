import * as api from '../api/index.js';
import {
    GET_WHISHLIST,
    GET_WHISHLIST_SUCCESS,
    GET_WHISHLIST_ERROR,
    ADD_PRODUCT_TO_WHISHLIST, ADD_PRODUCT_TO_WHISHLIST_SUCCESS, ADD_PRODUCT_TO_WHISHLIST_ERROR,
    REMOVE_PRODUCT_FROM_WHISHLIST, REMOVE_PRODUCT_FROM_WHISHLIST_SUCCESS, REMOVE_PRODUCT_FROM_WHISHLIST_ERROR
} from '../constants';
//=============================================//
export const getOrCreateWhishlistFromUser = (userId) => async(dispatch) => {
    dispatch({
        type: GET_WHISHLIST,
    })
    return await api.getOrCreateWhishlistFromUser(userId).
    then((whishlist) => {
        dispatch({
            type: GET_WHISHLIST_SUCCESS,
            payload: whishlist.data
        })
        localStorage.setItem('whishlist', JSON.stringify(whishlist.data))
    })
    .catch((error) => {
        dispatch({
            type: GET_WHISHLIST_ERROR,
            payload: error.response?.data
        })
    })
}
//=============================================//
export const addProductToWhishlist = (userId, productId) => async(dispatch) => {
    dispatch({
        type: ADD_PRODUCT_TO_WHISHLIST,
    })
    return await api.addProductToWhishlist(userId, productId)
    .then((whishlist) => {
        dispatch({
            type: ADD_PRODUCT_TO_WHISHLIST_SUCCESS,
            payload: whishlist.data
        })
        localStorage.setItem('whishlist', JSON.stringify(whishlist.data))
    })
    .catch((error) => {
        dispatch({
            type: ADD_PRODUCT_TO_WHISHLIST_ERROR,
            payload: error.response?.data
        })
    })
}
//=============================================//
export const removeProductFromWhishlist = (userId, productId) => async(dispatch) => {
    dispatch({
        type: REMOVE_PRODUCT_FROM_WHISHLIST    
    })
    return await api.removeProducFromWhishlist(userId, productId)
    .then((whishlist) => {
        dispatch({
            type: REMOVE_PRODUCT_FROM_WHISHLIST_SUCCESS,
            payload: whishlist.data
        })
        localStorage.setItem('whishlist', JSON.stringify(whishlist.data))
    })
    .catch((error) => {
        dispatch({
            type: REMOVE_PRODUCT_FROM_WHISHLIST_ERROR,
            payload: error.response?.data
        })
    })
}