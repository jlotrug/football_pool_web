import React, {useContext, useEffect} from "react"
import { PutPostData } from "../API/PutPostData"
import AuthenticationContext from "../Context/AuthenticationContext";

let poolUrl = "http://127.0.0.1:8000/api/v1/pools/"


export const NameForm = ({poolDispatch, setNewGameDisabled, newPool, league_id, pool}) => {
    const [formDisabled, setFormDisabled] = React.useState(false)
    const [submitValue, setSubmitValue] = React.useState('Done')
    const [firstSubmit, setFirstSubmit] = React.useState(true)
    const [poolName, setPoolName] = React.useState("")
    const {authTokens} = useContext(AuthenticationContext)

    // Checks if it's an edit or initial pool. Send correct data to API function
    const handleSubmit = (e) => {
        e.preventDefault()
        if(submitValue === 'Done'){
            if(firstSubmit){
                createEditPool(true, poolUrl, 'POOL')
                setFirstSubmit(false)
            }else{
                const editUrl = poolUrl + pool.id + '/'
                createEditPool(false, editUrl, 'POOL_EDIT')
            }
            setSubmitValue('Edit')
            setFormDisabled(true)
        }else{
            setSubmitValue('Done')
            setFormDisabled(false)
        }
    }

    useEffect(() => {
        if(pool){
            setPoolName(pool.pool_name)
            setFirstSubmit(false)
            setSubmitValue('Edit')
            setFormDisabled(true)
            
        }
    }, [])

    // Updates poolName with users input
    const handleNameChange = (e) => {
        setPoolName(e.target.value)
    }

    // Sends data for pool to be created or edited
    const createEditPool = (isPost, url, type) => {
        setNewGameDisabled(false)
        PutPostData(url, poolDispatch, type, isPost, {pool_name: poolName, league: league_id}, authTokens.access)
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Name</label><br />
            <span className='pool-input'>
                <input 
                disabled={formDisabled} 
                type="text" 
                placeholder='eg... Week 14'
                onChange={handleNameChange}
                value = {poolName}
                ></input>
            </span>
            <span className='pool-input'>
                <input 
                type="submit" 
                value={submitValue}
                ></input>
            </span>
        </form>
    )
}