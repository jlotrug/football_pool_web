import React from "react";

export const UserReducer = (state, action) => {
    switch(action.type){
        case 'NEW_USER_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'NEW_USER_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'NEW_USER_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            throw new Error(); 
    }
}