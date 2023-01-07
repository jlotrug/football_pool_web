import React from "react";

export const CreateAccount = () => {
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [userName, setUserName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [disabledSubmit, setDisabledSubmit] = React.useState(true)

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

    const handleSubmit = (e) => {
        e.preventDefault()
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
                <input onChange={handleChangePassword} value={password} type="password" autocomplete="new-password"></input><br />
                <label>Confirm Password</label><br />
                <input onChange={handleChangeConfirmPassword} value={confirmPassword} type="password"></input><br /><br />
                <input disabled={disabledSubmit} className="create-submit" type="submit" value="Submit"></input>

            </form>
            </>
    )
}