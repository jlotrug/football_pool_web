import axios from 'axios';

export const RefreshAccessToken = async() => {
   
        try{
            const result = await axios.post("http://127.0.0.1:8000/api/v1/token/refresh/", {
                refresh: localStorage['refresh']
            }, {
                headers: {'Content-Type': 'application/json'}
            }, {withCredentials: true})
            
            console.log(result.data.acess)
            localStorage['session'] = result.data.access
            localStorage['refresh'] = result.data.refresh
            console.log(result.data.access)
        }catch(e){
            console.log(e)
          
        }
}