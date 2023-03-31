import axios from 'axios';
import { GetTokenHeaders } from "../API/GetTokenHeaders"

export const FetchData = async(url, dispatchFunction, type) => {
    dispatchFunction({type: type + '_FETCH_INIT'})

        try{
            const result = await axios.get(url, GetTokenHeaders())
            dispatchFunction({
                type: type + '_FETCH_SUCCESS',
                payload: result.data,
                
            })
        }catch(e){
            console.log(e)
            dispatchFunction({type: type + '_FETCH_FAILURE'})
        }
}