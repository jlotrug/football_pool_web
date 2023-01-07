import React from "react";
import { UserReducer } from "./UsersReducer";
import axios from "axios";

const accountsUrl = "http://localhost:8080/account/users/"

export const CreateAccount = () => {
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [userName, setUserName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [disabledSubmit, setDisabledSubmit] = React.useState(true)

    const [newUser, dispatchNewUser] = React.useReducer(
        UserReducer, {data: [], isLoading: false, isError:false}
    )


    const handleSubmit = async(e) => {
        e.preventDefault()

        dispatchNewUser({type: 'NEW_USER_INIT'})

        try{
            const result = await axios.post(accountsUrl, {
                name: firstName,
                lname: lastName,
                username: userName,
                password: password,

            })

            dispatchNewUser({
                type: 'NEW_USER_SUCCESS',
                payload: result.data
            })

        }catch{
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


    React.useEffect(() => {
        if(password == confirmPassword && password){
            setDisabledSubmit(false)
        }else{
            setDisabledSubmit(true)
        }

    }, [password, confirmPassword])

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
                <label>Password</label><br />
                <input onChange={handleChangePassword} value={password} type="password" autoComplete="new-password"></input><br />
                <label>Confirm Password</label><br />
                <input onChange={handleChangeConfirmPassword} value={confirmPassword} type="password"></input><br /><br />
                <input disabled={disabledSubmit} className="create-submit" type="submit" value="Submit"></input>

            </form>
            </>
    )
}