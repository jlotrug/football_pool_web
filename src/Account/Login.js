import React, {useContext} from "react";
import AuthenticationContext from "../Context/AuthenticationContext";

// const loginUrl = "http://127.0.0.1:8000/api/v1/dj-rest-auth/login/"
const loginUrl = process.env.REACT_APP_SEVER_URL + "/api/v1/dj-rest-auth/login/"

export const Login = () => {
    const [username, setUsername] = React.useState("")
    const [password, setPassword]  = React.useState("")
    const [allErrors, setAllErrors] = React.useState([])
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
            username: username.toLowerCase(),
            password: password
        }
        storeCredentials(userData, loginUrl, setAllErrors)
    }

    return(
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input onChange={handleChangeUsername} value={username} type="text"></input><br />
                <label>Password: </label>
                <input onChange={handleChangePassword} value={password} type="password"></input><br /><br />
                <ErrorList errors = {allErrors}/>
                <input className="create-submit" type="submit" value="Login"></input>
            </form>
        </>
    )
}

const ErrorList = ({errors}) => {
    return(
        <div className="error-list">
            <ul className="no-bullet error-list">
            {Object.entries(errors).map(([key, value]) => {
                return <li key={key}> {value[0]} </li>
            })
                }
            </ul>
        </div>
    )
}