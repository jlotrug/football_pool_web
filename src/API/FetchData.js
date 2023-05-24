import axios from 'axios';
import { useContext } from "react"
import AuthenticationContext from "../Context/AuthenticationContext"
import { GetTokenHeaders } from "../API/GetTokenHeaders"

export const FetchData = async(url, dispatchFunction, type) => {
    // const {authTokens} = useContext(AuthenticationContext)
    dispatchFunction({type: type + '_FETCH_INIT'})
    // console.log("Local Storage" + localStorage['session'])
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