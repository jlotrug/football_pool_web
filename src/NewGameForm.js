import React from "react"
import { NewGameReducer } from './NewGameReducer';
import axios from "axios";

export const GameForm = ({handleCallback, gameId, poolId}) => {
    const [inputHidden, setInputHidden] = React.useState(false)
    const [submitValue, setSubmitValue] = React.useState('Done')
    const [teamOne, setTeamOne] = React.useState("")
    const [teamTwo, setTeamTwo] = React.useState("")

    const [newGame, dispatchNewGame] = React.useReducer(
        NewGameReducer, {data: null, isLoading: false, isError: true}
    )

    const gamesUrl = "http://localhost:8080/api/games/"

    const handleSubmit = (e) => {
        if(submitValue === 'Done'){
            setSubmitValue('Edit')
            setInputHidden(true)
            handleCallback(e)
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

    const createNewGame = async(e) =>{
        e.preventDefault()

        dispatchNewGame({type: 'NEW_GAME_INIT'})

        try{
            const result = await axios.post(gamesUrl, {
                team_one: teamOne,
                team_two: teamTwo,
                pool: poolId,
            })
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
            <form onSubmit={createNewGame}>
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