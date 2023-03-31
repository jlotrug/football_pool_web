import React from "react";

export const LoginReducer = (state, action) => {
    switch(action.type){
        case 'NEW_LOGIN_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'NEW_LOGIN_SUCCESS':
            
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'NEW_LOGIN_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            throw new Error(); 
    }
}