import axios from 'axios';

export const RefreshAccessToken = async() => {
   
        try{
            const result = await axios.post(process.env.REACT_APP_SEVER_URL + "/api/v1/token/refresh/", {
                refresh: localStorage['refresh']
            }, {
                headers: {'Content-Type': 'application/json'}
            }, {withCredentials: true})
            
            console.log(result.data.acess)
            console.log(result)
            localStorage['session'] = result.data.access
            localStorage['refresh'] = result.data.refresh
            console.log(result.data.access)
        }catch(e){
            console.log(e)
          
        }
}