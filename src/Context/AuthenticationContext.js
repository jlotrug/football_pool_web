import { createContext, useState, useEffect, useReducer } from "react";
import { LoginReducer } from "../Reducers/LoginReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AuthenticationContext = createContext()

export default AuthenticationContext

const loginUrl = "http://127.0.0.1:8000/api/v1/dj-rest-auth/login/"
const refreshUrl = "http://127.0.0.1:8000/api/v1/token/refresh/"

export const AuthenticationProvider = ({children}) => {
    const [user, setUser] = useState(() => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null)
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const [login, dispatchLogin] = useReducer(
        LoginReducer, {data: [], isLoading: false, isError: false}
    )

    const handleGetUsername = (e) => {
        setUsername(e.target.value)
    }
    const handleGetPassword = (e) => {
        setPassword(e.target.value)
    }

    let loginUser = async(e) => {
        e.preventDefault()

        dispatchLogin({type: 'NEW_LOGIN_INIT'})
        
        try{
            const result = await axios.post(loginUrl, {
                username: username,
                password: password
            })
            dispatchLogin({type: 'NEW_LOGIN_SUCCESS'})
            setAuthTokens({
                access: result.data.access,
                refresh: result.data.refresh
            })
            setUser(result.data.user)
            localStorage.setItem('authTokens', JSON.stringify({access: result.data.access, refresh: result.data.refresh}))
            localStorage.setItem('user', JSON.stringify(result.data.user))
            // console.log(localStorage.getItem('authTokens'))
            navigate("/")
            
        }catch(e){
            console.log(e)
            dispatchLogin({type: 'NEW_LOGIN_FAILURE'})
        }
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
                refresh: authTokens?.refresh
            })
            setAuthTokens({
                access: result.data.access,
                refresh: result.data.refresh
            })
            // console.log(result)
            // setUser(result.data.user)
            localStorage.setItem('authTokens', JSON.stringify({access: result.data.access, refresh: result.data.refresh}))
            // localStorage.setItem('user', JSON.stringify(result.data.user))
            // console.log(localStorage.getItem('authTokens'))
            
            
        }catch(e){
            console.log(e)
            logoutUser()
        }
        if(loading) setLoading(false)
    }
     

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        handleGetUsername: handleGetUsername,
        handleGetPassword: handleGetPassword,

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