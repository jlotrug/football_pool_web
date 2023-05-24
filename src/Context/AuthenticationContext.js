import { createContext, useState, useEffect, useReducer } from "react";
import { LoginReducer } from "../Reducers/LoginReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthenticationContext = createContext()

export default AuthenticationContext

const loginUrl = "http://127.0.0.1:8000/api/v1/dj-rest-auth/login/"

export const AuthenticationProvider = ({children}) => {
    // let [user, setUser] = useState(null)
    let [authTokens, setAuthTokens] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
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

        console.log(username)
        console.log(password)

        dispatchLogin({type: 'NEW_LOGIN_INIT'})
        
        try{
            const result = await axios.post(loginUrl, {
                username: username,
                password: password
            })
            dispatchLogin({type: 'NEW_LOGIN_SUCCESS'})
            navigate("/")
            
        }catch(e){
            console.log(e)
            dispatchLogin({type: 'NEW_LOGIN_FAILURE'})
        }
    }

    const handleLogin = (u, p) => {
        
        setUsername(u)
        setPassword(p)

        loginUser()
        console.log(username)

    }
     

    let contextData = {
        loginUser: loginUser,
        // handleLogin: handleLogin,
        handleGetUsername: handleGetUsername,
        handleGetPassword: handleGetPassword
    }

    return(
        <AuthenticationContext.Provider value={contextData}>
            {children}
            
        </AuthenticationContext.Provider>
    )
}