import { createContext, useState, useEffect, useReducer } from "react";
import { UserAPICall } from "../API/UserAPICall";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AuthenticationContext = createContext()

export default AuthenticationContext

const refreshUrl = "http://127.0.0.1:8000/api/v1/token/refresh/"

export const AuthenticationProvider = ({children}) => {
    const [user, setUser] = useState(() => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null)
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null)
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState("Hello")
    const navigate = useNavigate()

    // const storeCredentials = (result) => {
    //     // console.log(result)
    //     setUser(result.data.user)
    //         localStorage.setItem('authTokens', JSON.stringify({access: result.data.access, refresh: result.data.refresh}))
    //         localStorage.setItem('user', JSON.stringify(result.data.user))
    //         setAuthTokens({
    //         access: result.data.access,
    //         refresh: result.data.refresh
    //         })
    //         navigate("/")
    // }


    const storeCredentials = async(userData, url, setAllErrors) => {
        let result

        result = await axios.post(url, userData).then(result => {
            setUser(result.data.user)
            localStorage.setItem('authTokens', JSON.stringify({access: result.data.access, refresh: result.data.refresh}))
            localStorage.setItem('user', JSON.stringify(result.data.user))
            setAuthTokens({
            access: result.data.access,
            refresh: result.data.refresh
            })

        }).catch(async e => {
            setAllErrors(e.response.data)
            // await new Promise.all(e => setErrors(e));
            // console.log(e)
            // return e
            // const r = await Promise.all(e);
            // console.log(r)
            // throw e
            // return r;
            // console.log(result)
            setErrors("GGGGG")
            // return errors.response.data
        })
        console.log(result)
        setErrors("GGGGG")
        return result
        // .then(p => {
        //     console.log(p)
        //     // setErrors(p)
        //     return p
        // })

        /*
        try{
            result = await UserAPICall(userData, url)
            setUser(result.data.user)
            localStorage.setItem('authTokens', JSON.stringify({access: result.data.access, refresh: result.data.refresh}))
            localStorage.setItem('user', JSON.stringify(result.data.user))
            setAuthTokens({
            access: result.data.access,
            refresh: result.data.refresh
        })
        // console.log(result)
        // if(!result)
        navigate("/")
        }catch(e){
            console.log(result)
            while(e === null){
                console.log("Hello world")
            }
            
            // throw e
            // console.log(e.response.data)
            // const errors = await e.response.data
            // return errors

        }*/
        
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
        errors: errors,
        setErrors: setErrors,
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