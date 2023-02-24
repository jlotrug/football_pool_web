import React from "react";
import { UserReducer } from "./UsersReducer";
import axios from "axios";

// const accountsUrl = "http://localhost:8080/account/users/"
// const accountsUrl = "localhost:8080/api/dj-rest-auth/registration/"
// const accountsUrl = "localhost:8080/api/rest-auth/registration/"
const accountsUrl = "http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/"

export const CreateAccount = () => {
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [userName, setUserName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [allErrors, setAllErrors] = React.useState([])
    const [disabledSubmit, setDisabledSubmit] = React.useState(true)

    const [newUser, dispatchNewUser] = React.useReducer(
        UserReducer, {data: [], isLoading: false, isError:false}
    )


    const handleSubmit = async(e) => {
        e.preventDefault()

        dispatchNewUser({type: 'NEW_USER_INIT'})

        try{
            const result = await axios.post(accountsUrl, {
                first_name: firstName,
                last_name: lastName,
                username: userName,
                password1: password,
                password2: confirmPassword,
                email: email

            })

            console.log(result)
            dispatchNewUser({
                type: 'NEW_USER_SUCCESS',
                payload: result.data
            })

        }catch(e){
            console.log(e.response.data)
            setAllErrors(e.response.data)
            dispatchNewUser({type: 'NEW_USER_FAILURE'})

        }
    }

    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value)
    } 
    const handleChangeLastName = (e) => {
        setLastName(e.target.value)
    } 
    const handleChangeUserName = (e) => {
        setUserName(e.target.value)
    } 
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    } 
    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    } 

    const handleChangeEmail = (e) =>{
        setEmail(e.target.value)
    }


    React.useEffect(() => {
        if(password === confirmPassword && password && firstName && lastName && userName && email){
            setDisabledSubmit(false)
        }else{
            setDisabledSubmit(true)
        }

    }, [password, confirmPassword, userName, lastName, email, firstName])

    return(
        <>
            <h1>Create Account</h1>
            

            <form onSubmit={handleSubmit}>
                <label>First Name</label><br />
                <input onChange={handleChangeFirstName} value={firstName} type="text"></input><br />
                <label>Last Name</label><br />
                <input onChange={handleChangeLastName} value={lastName} type="text"></input><br />
                <label>Username</label><br />
                <input onChange={handleChangeUserName} value={userName} type="text"></input><br />
                <label>Email</label><br />
                <input onChange={handleChangeEmail} value={email} type="text"></input><br />
                <label>Password</label><br />
                <input onChange={handleChangePassword} value={password} type="password" autoComplete="new-password"></input><br />
                <label>Confirm Password</label><br />
                <input onChange={handleChangeConfirmPassword} value={confirmPassword} type="password"></input><br /><br />
                <ErrorList errors = {allErrors}/>
                <input disabled={disabledSubmit} className="create-submit" type="submit" value="Submit"></input>

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