import axios from 'axios';
import { GetTokenHeaders } from "../API/GetTokenHeaders"

// export const PutPostData = async(url, dispatchFunction, type, isPost, postPutData, currentData, token) =>{
export const PutPostData = async(url, dispatchFunction, type, isPost, postPutData, token, currentData) =>{
    if(!currentData) currentData = []
    console.log("Hello")
    dispatchFunction({type:'NEW_' + type + '_INIT'})

    try{
        let result
       if(isPost){  result = await axios.post(url, postPutData, GetTokenHeaders(token))}
       else {  result = await axios.put(url, postPutData, GetTokenHeaders(token))}
    //    console.log(currentData)
        dispatchFunction({
            type: 'NEW_' + type + '_SUCCESS',
            payload: [...currentData, result.data]
            // payload: [result.data]
        })
        // console.log(result)
    }catch(e){
        console.log(e)
        dispatchFunction({type: 'NEW_' + type + '_FAILURE'})
    }
}