import React, {useContext} from "react";
import { LoginReducer } from "../Reducers/LoginReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AuthenticationContext from "../Context/AuthenticationContext";

// const loginUrl = "http://localhost:8080/api/dj-rest-auth/login/"
// const loginUrl = "http://localhost:8080/account/login/"
const loginUrl = "http://127.0.0.1:8000/api/v1/dj-rest-auth/login/"
// const loginUrl = "http://127.0.0.1:8000/api/v1/token/"

export const Login = ({handleCurrentUser}) => {
    const [username, setUsername] = React.useState("")
    const [password, setPassword]  = React.useState("")
    // const navigate = useNavigate()
    let {loginUser, handleGetUsername, handleGetPassword} = useContext(AuthenticationContext)

    // const [login, dispatchLogin] = React.useReducer(
    //     LoginReducer, {data: [], isLoading: false, isError: false}
    // )

    const handleChangeUsername = (e) => {
        handleGetUsername(e)
        setUsername(e.target.value)
    }
    const handleChangePassword = (e) => {
        handleGetPassword(e)
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // handleGetUsername(username)
        // handleGetPassword(password)
        // loginUser(e)
        // handleLogin(username, password)
    }

    // const handleSubmit = async(e) => {
    //     e.preventDefault()

    //     dispatchLogin({type: 'NEW_LOGIN_INIT'})
        
    //     try{
    //         const result = await axios.post(loginUrl, {
    //             username: username,
    //             password: password
    //         })
    //         console.log(result)
    //         dispatchLogin({type: 'NEW_LOGIN_SUCCESS'})
    //         localStorage['session'] = result.data.access
    //         localStorage['refresh'] = result.data.refresh
    //         localStorage['user_id'] = result.data.user.id
    //         localStorage['user'] = result.data.user.first_name
    //         handleCurrentUser(result.data.user.first_name)
            
    //         console.log(result.data.user.first_name)
    //         const decodedData = jwt_decode(result.data.access)
    //         // console.log(localStorage['session'])
    //         console.log(decodedData)
    //         console.log(result.data.access)
    //         navigate("/")
            
    //     }catch(e){
    //         console.log(e)
    //         dispatchLogin({type: 'NEW_LOGIN_FAILURE'})
    //     }
    // }

    return(
        <>
            <h1>Login</h1>

            {/* <form onSubmit={handleSubmit}> */}
            <form onSubmit={loginUser}>
                <label>Username: </label>
                <input onChange={handleChangeUsername} value={username} type="text"></input><br />
                <label>Password: </label>
                <input onChange={handleChangePassword} value={password} type="password"></input><br /><br />
                <input className="create-submit" type="submit" value="Login"></input>

            </form>
        </>
    )
}