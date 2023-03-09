import React from "react"
import { NewGameReducer } from './NewGameReducer';
import axios from "axios";
import { getTokenHeaders } from "./APIFunctions";

export const GameForm = ({gameId, poolId}) => {
    const [inputHidden, setInputHidden] = React.useState(false)
    const [submitValue, setSubmitValue] = React.useState('Done')
    const [teamOne, setTeamOne] = React.useState("")
    const [teamTwo, setTeamTwo] = React.useState("")

    const [newGame, dispatchNewGame] = React.useReducer(
        NewGameReducer, {data: null, isLoading: false, isError: true}
    )

    const gamesUrl = "http://localhost:8000/api/v1/games/"

    const handleSubmit = (e) => {
        if(submitValue === 'Done'){
            editGame(e)
            setSubmitValue('Edit')
            setInputHidden(true)
            // handleCallback(e)
        }else{
            setSubmitValue('Done')
            setInputHidden(false)
            e.preventDefault()
        }
    }

    const handleTeamOneChange = (e) => {
        setTeamOne(e.target.value)
    }
    const handleTeamTwoChange = (e) => {
        setTeamTwo(e.target.value)
    }

    const editGame = async(e) =>{
        e.preventDefault()

        dispatchNewGame({type: 'NEW_GAME_INIT'})

        try{
            const result = await axios.put(gamesUrl+gameId+ '/', {
                team_one: teamOne,
                team_two: teamTwo,
                pool: poolId
            }, getTokenHeaders())
            console.log(result)
            dispatchNewGame({
                type: 'NEW_GAME_SUCCESS',
                payload: result.data
            })
        }catch{
            dispatchNewGame({type: 'NEW_GAME_FAILURE'})
        }
    }

    return(
        <li>
            <form onSubmit={handleSubmit}>
                <span className='pool-input'>
                    {/* Makes the game id accessible for edits */}
                    <input type="hidden" value ={gameId} ></input> 
                </span>
                <span className='pool-input'>
                    <label className='team-input' hidden={!inputHidden}>{teamOne}</label>
                    <input 
                    type="text" 
                    name='team-one' 
                    hidden={inputHidden} 
                    value={teamOne}
                    onChange={handleTeamOneChange}
                    ></input> 
                </span>

                <span>
                    <label className='input-vs'> vs. </label>
                </span>
                <span className='pool-input'>
                    <label className='team-input' hidden={!inputHidden}>{teamTwo}</label>
                    <input 
                    type="text" 
                    name='team-two' 
                    hidden={inputHidden} 
                    value={teamTwo}
                    onChange={handleTeamTwoChange}
                    ></input>
                </span>

                <span className='pool-input'>
                    <input type="submit" value={submitValue}></input>
                </span>
            </form>
        </li>
    )
}