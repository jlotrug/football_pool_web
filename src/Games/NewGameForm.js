import React, {useContext, useEffect} from "react"
import { NewGameReducer } from '../Reducers/NewGameReducer';
import { PutPostData } from '../API/PutPostData';
import AuthenticationContext from "../Context/AuthenticationContext";

const gamesUrl = "http://localhost:8000/api/v1/games/"

export const GameForm = ({gameId, poolId, game}) => {
    const [inputHidden, setInputHidden] = React.useState(false)
    const [submitValue, setSubmitValue] = React.useState(game.team_one || game.team_two ? 'Edit' : 'Done')
    const [teamOne, setTeamOne] = React.useState(game.team_one)
    const [teamTwo, setTeamTwo] = React.useState(game.team_two)
    const {authTokens} = useContext(AuthenticationContext)

    const [newGame, dispatchNewGame] = React.useReducer(
        NewGameReducer, {data: [], isLoading: false, isError: true}
    )

    useEffect(() => {
        if(submitValue === 'Done'){
            // setSubmitValue('Edit')
            setInputHidden(false)
            // handleCallback(e)
        }else{
            // setSubmitValue('Done')
            setInputHidden(true)
        }
    }, [])

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

    const editGame = (e) => {
        e.preventDefault()
        // PutPostData(gamesUrl + gameId+'/', dispatchNewGame, 'GAME', false, {team_one: teamOne, team_two: teamTwo, pool: poolId}, newGame.data)
        PutPostData(gamesUrl + gameId+'/', dispatchNewGame, 'GAME', false, {team_one: teamOne, team_two: teamTwo, pool: poolId}, authTokens.access, newGame.data)
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
                    value={teamOne ? teamOne : ""}
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
                    value={teamTwo ? teamTwo : ""}
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