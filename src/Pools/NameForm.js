import React from "react"
import { NewPoolReducer } from "../Reducers/NewPoolReducer"
import { PutPostData } from "../API/PutPostData"

let poolUrl = "http://127.0.0.1:8000/api/v1/pools/"

export const NameForm = ({poolDispatch, setNewGameDisabled, newPool}) => {
    const [formDisabled, setFormDisabled] = React.useState(false)
    const [submitValue, setSubmitValue] = React.useState('Done')
    const [firstSubmit, setFirstSubmit] = React.useState(true)
    const [poolName, setPoolName] = React.useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if(submitValue === 'Done'){
            if(firstSubmit){
                createEditPool(true, poolUrl, 'POOL')
                setFirstSubmit(false)
            }else{
                const editUrl = poolUrl + newPool.data[0].id + '/'
                createEditPool(false, editUrl, 'POOL_EDIT')
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

    // const newPoolCreate = (isPost, url, type) => {
    //     setNewGameDisabled(false)
    //     PutPostData(url, dispatchNewPool, type, isPost, {pool_name: poolName, league: 1}, newPool.data)
    // }

    const createEditPool = (isPost, url, type) => {
        setNewGameDisabled(false)
        PutPostData(url, poolDispatch, type, isPost, {pool_name: poolName, league: 1}, newPool.data)
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