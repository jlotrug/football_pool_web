import React from "react";
import { LoginReducer } from "../Reducers/LoginReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const loginUrl = "http://localhost:8080/api/dj-rest-auth/login/"
// const loginUrl = "http://localhost:8080/account/login/"
const loginUrl = "http://127.0.0.1:8000/api/v1/dj-rest-auth/login/"

export const Login = ({handleCurrentUser}) => {
    const [username, setUsername] = React.useState("")
    const [password, setPassword]  = React.useState("")
    const navigate = useNavigate()

    const [login, dispatchLogin] = React.useReducer(
        LoginReducer, {data: [], isLoading: false, isError: false}
    )

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        dispatchLogin({type: 'NEW_LOGIN_INIT'})
        
        try{
            const result = await axios.post(loginUrl, {
                username: username,
                password: password
            })
            dispatchLogin({type: 'NEW_LOGIN_SUCCESS'})
            localStorage['session'] = result.data.key
            localStorage['user_id'] = result.data.user.id
            // localStorage['user'] = result.data.user.first_name
            handleCurrentUser(result.data.user.first_name)
            
            console.log(result)
            console.log(localStorage['session'])
            navigate("/")
            
        }catch(e){
            console.log(e)
            dispatchLogin({type: 'NEW_LOGIN_FAILURE'})
        }
    }

    return(
        <>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input onChange={handleChangeUsername} value={username} type="text"></input><br />
                <label>Password: </label>
                <input onChange={handleChangePassword} value={password} type="password"></input><br /><br />
                <input className="create-submit" type="submit" value="Login"></input>

            </form>
        </>
    )
}