import { RefreshAccessToken } from "./RefreshAccessToken"
// Create header with user token
export const GetTokenHeaders = () => {
    RefreshAccessToken()
    const tokenHeaders = {
        
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage['session']
            }
    }
    return tokenHeaders
}