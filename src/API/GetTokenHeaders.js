import { useContext } from "react"
import { RefreshAccessToken } from "./RefreshAccessToken"
import AuthenticationContext from "../Context/AuthenticationContext"
// Create header with user token
export const GetTokenHeaders = () => {
    const token = JSON.parse(localStorage.getItem('authTokens')).access
    
    const tokenHeaders = {
        
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            }
    }
    return tokenHeaders
}