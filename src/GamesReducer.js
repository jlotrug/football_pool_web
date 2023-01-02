import React from "react";


export const GamesReducer = (state, action) =>{
    // console.log("hello")
    switch(action.type){
        case 'CREATE_GAME_INIT':
            console.log("init")
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'CREATE_GAME_SUCCESS':
            console.log(action.payload)
            console.log("create")
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case 'CREATE_GAME_FAILURE':
            console.log("Failure")
            return{
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            console.log("default")
            throw new Error();
    }
}

