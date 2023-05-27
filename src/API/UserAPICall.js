import axios from "axios";

export const UserAPICall = (userData, url) => {

    try{
        return axios.post(url, userData)
        
    }catch(e){
        console.log(e)
    }
}