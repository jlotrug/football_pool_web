import { useCallback } from "react"
import axios from 'axios';
import { GetTokenHeaders } from "../API/GetTokenHeaders"

export const FetchData = async(url, dispatchFunction, reducerType) => {
    dispatchFunction({type: reducerType + '_FETCH_INIT'})

        try{
            const result = await axios.get(url, GetTokenHeaders())
            dispatchFunction({
                type: reducerType + '_FETCH_SUCCESS',
                payload: result.data,
                
            })
        }catch(e){
            console.log(e)
            dispatchFunction({type: reducerType + '_FETCH_FAILURE'})
        }
}