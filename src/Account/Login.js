import React, {useContext} from "react";
import AuthenticationContext from "../Context/AuthenticationContext";

export const Login = () => {
    const [username, setUsername] = React.useState("")
    const [password, setPassword]  = React.useState("")
    let {loginUser, handleGetUsername, handleGetPassword} = useContext(AuthenticationContext)


    const handleChangeUsername = (e) => {
        handleGetUsername(e)
        setUsername(e.target.value)
    }
    const handleChangePassword = (e) => {
        handleGetPassword(e)
        setPassword(e.target.value)
    }

    return(
        <>
            <h1>Login</h1>
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