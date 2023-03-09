import React from "react"
import axios from "axios"
import { getTokenHeaders } from "./APIFunctions"

const poolUrl = "http://localhost:8000/api/v1/pools/"

export const NameForm = ({formClass, handleCallback, poolDispatch, poolId}) => {
    const [formDisabled, setFormDisabled] = React.useState(false)
    const [submitValue, setSubmitValue] = React.useState('Done')
    const [firstSubmit, setFirstSubmit] = React.useState(true)
    const [poolName, setPoolName] = React.useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if(submitValue === 'Done'){
            if(firstSubmit){
                handleCallback(poolName)
                setFirstSubmit(false)
            }else{
                editName()
            }
            
            setSubmitValue('Edit')
            setFormDisabled(true)
        }else{
            setSubmitValue('Done')
            setFormDisabled(false)
        }
    }

    const handleNameChange = (e) => {
        setPoolName(e.target.value)
    }

    const editName = async() => {
        
        poolDispatch({type: 'NEW_POOL_INIT'})

        try{
            const result = await axios.put(poolUrl + poolId + '/', {
                pool_name: poolName,
            }, getTokenHeaders())

            poolDispatch({type: 'EDIT_POOL_SUCCESS', payload: result.data})
        }catch(e){
            poolDispatch({type: 'NEW_POOL_FAILURE'})
        }
    }

    return(
        <form onSubmit={handleSubmit} className={formClass}>
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