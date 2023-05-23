import React from "react"
import { useNavigate } from "react-router-dom";
import { NewLeagueReducer } from '../Reducers/NewLeagueReducer';
import { PutPostData } from "../API/PutPostData"
import { GenerateRandomCode } from "./LeagueCodeGenerator";
import '../static/style/League.css';


let url = "http://127.0.0.1:8000/api/v1/leagues/"

export const NewLeagueForm = () => {
    const [leagueName, setLeagueName] = React.useState("")
    const [newLeague, dispatchNewLeague] = React.useReducer(
        NewLeagueReducer, {data: [], isLoading: false, isError: false}
    )
    const navigate = useNavigate()

    const handleSubmit = () => {
        let code = GenerateRandomCode()
        console.log(code)
        PutPostData(url, dispatchNewLeague, 'League', true, {league_name: leagueName, user: localStorage['user_id'], code: code})
        navigate("/leagues")
    }

    const handleNameChange = (e) => {
        setLeagueName(e.target.value)
    }
    return(
        <form onSubmit={handleSubmit}>
            <label>Name</label><br />
            <span className='league-input'>
                <input 
                // disabled={formDisabled} 
                type="text" 
                placeholder='eg... Office League'
                onChange={handleNameChange}
                // value = {poolName}
                ></input>
            </span>
            <span className='league-input'>
                <input 
                type="submit" 
                // value={submitValue}
                value ="Done"
                ></input>
            </span>
        </form>
    )
}
