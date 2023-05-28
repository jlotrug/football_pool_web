import React, {useContext} from "react";
import AuthenticationContext from "../Context/AuthenticationContext";

const loginUrl = "http://127.0.0.1:8000/api/v1/dj-rest-auth/login/"

export const Login = () => {
    const [username, setUsername] = React.useState("")
    const [password, setPassword]  = React.useState("")
    const {storeCredentials} = useContext(AuthenticationContext)


    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            username: username,
            password: password
        }
        storeCredentials(userData, loginUrl)
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