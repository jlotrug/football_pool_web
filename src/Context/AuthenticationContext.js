import { createContext, useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AuthenticationContext = createContext()

export default AuthenticationContext

const refreshUrl = process.env.REACT_APP_SEVER_URL + "/api/v1/token/refresh/"

export const AuthenticationProvider = ({children}) => {
    const [user, setUser] = useState(() => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null)
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const storeCredentials = (userData, url, setAllErrors) => {

        axios.post(url, userData, {headers:{"Access-Control-Allow-Origin": "*"} }).then(result => {
            setUser(result.data.user)
            localStorage.setItem('authTokens', JSON.stringify({access: result.data.access, refresh: result.data.refresh}))
            localStorage.setItem('user', JSON.stringify(result.data.user))
            setAuthTokens({
            access: result.data.access,
            refresh: result.data.refresh
            })
            navigate('/')

        }).catch(e => {
            setAllErrors(e.response.data)
        })
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        localStorage.removeItem('user')
        navigate("/")
    }

    const tokenUpdate = async () => {
        console.log("TOken updated")
        try{
            const result = await axios.post(refreshUrl, {
                refresh: authTokens?.refresh,
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            })
            setAuthTokens({
                access: result.data.access,
                refresh: result.data.refresh
            })
            localStorage.setItem('authTokens', JSON.stringify({access: result.data.access, refresh: result.data.refresh}))            
        }catch(e){
            console.log(e)
            logoutUser()
        }
        if(loading) setLoading(false)
    }     

    let contextData = {
        user: user,
        authTokens: authTokens,
        logoutUser: logoutUser,
        storeCredentials: storeCredentials,
    }

    useEffect(() => {
        // if the window is closed and the access token expires, it will run tokenUpdate() first and then start the interval
        // At end of tokenUpdate(), if loading is true, it must be set to false
        if(loading){
            tokenUpdate()
        }

        const interval = setInterval(() => {
            if(authTokens){
                tokenUpdate()
            }
        }, 240000)
        return () => clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthenticationContext.Provider value={contextData}>
            {loading ? null : children}            
        </AuthenticationContext.Provider>
    )
}