import axios from 'axios';
import { GetTokenHeaders } from "../API/GetTokenHeaders"

export const PutPostData = async(url, dispatchFunction, type, isPost, postPutData, token) =>{
    dispatchFunction({type:'NEW_' + type + '_INIT'})

    try{
        let result
       if(isPost){  result = await axios.post(url, postPutData, GetTokenHeaders(token))}
       else {  result = await axios.put(url, postPutData, GetTokenHeaders(token))}

        dispatchFunction({
            type: 'NEW_' + type + '_SUCCESS',
            payload: result.data
        })
    }catch(e){
        console.log(e)
        dispatchFunction({type: 'NEW_' + type + '_FAILURE'})
    }
}