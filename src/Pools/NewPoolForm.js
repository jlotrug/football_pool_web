import '../static/style/App.css';
import React, {useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button'
import {NewPoolReducer} from '../Reducers/NewPoolReducer'
import { GameForm } from '../Games/NewGameForm';
import { NewGameReducer } from '../Reducers/NewGameReducer';
import {selectedGamesReducer} from '../Reducers/GamePoolReducers';
import { NameForm } from './NameForm';
import { Link } from 'react-router-dom';
import { PutPostData } from '../API/PutPostData';
import { useLocation } from "react-router-dom"
import AuthenticationContext from "../Context/AuthenticationContext";
import { FetchData } from "../API/FetchData";

const gamesUrl = "http://localhost:8000/api/v1/games/"
const fetchGamesUrl = "http://localhost:8000/api/v1/games?poolid="

export const NewPoolForm = ({formClass, handleAllPools, handleAllGames, handleDone}) => {
    // const [submitValue, setSubmitValue] = React.useState('Done')
    const location = useLocation();
    const league_id = location.state.league_id
    const pool = location.state.pool
    let newEdit = false
    const {authTokens} = useContext(AuthenticationContext)
    const [newGameDisabled, setNewGameDisabled] = React.useState(true)
    const [games, dispatchGame] = React.useReducer(
        NewGameReducer, {data:[], isLoading: false, isError: false}
    )
    const [newPool, dispatchNewPool] = React.useReducer(
        NewPoolReducer, {data: [], isLoading: false, isError: false}
    )
    const [fetchedGames, dispatchFetchedGames] = React.useReducer(
        selectedGamesReducer, {data: [], isLoading: false, isError: false}
    )

    useEffect(() => {
        if(pool){
            dispatchNewPool({
                type: 'NEW_POOL_SUCCESS',
                payload: [pool]
            })
            newEdit = true
            FetchData(fetchGamesUrl+pool.id, dispatchFetchedGames, 'GAMES', authTokens.access)
            // games.data
            dispatchGame({
                type: 'NEW_GAME_SUCCESS',
                payload: [fetchedGames.data]
            })
            console.log(fetchedGames)
        }
    }, [])

    const handlesNewGameClick = () => {
        createNewGame()
    }

    const createNewGame = () => {
        // PutPostData(gamesUrl, dispatchGame,'GAME', true, {pool: newPool.data[0].id,}, games.data)
        PutPostData(gamesUrl, dispatchGame,'GAME', true, {pool: newPool.data[0].id,}, authTokens.access, games.data)
    }

    return(
        <div className="">
            {/* {console.log(newPool)} */}
            <NameForm 
            poolDispatch={dispatchNewPool}
            setNewGameDisabled={setNewGameDisabled}
            newPool = {newPool}
            pool = {pool}            
            league_id = {league_id}
            newEdit = {!!pool ? true : false}
            />
            <div>
                <ul className='no-bullet'>
                    {games.data.map(game => {
                       const id = game.id
                       // Passes id down as a prop so it can be accessed
                    return <GameForm 
                            key={id} 
                            gameId={id} 
                            // handleCallback={handleGameSubmit}
                            poolId = {newPool.data[0].id}
                            />
                    })}
                </ul>

                <Button 
                variant='btn btn-dark' 
                disabled={newGameDisabled}
                onClick={handlesNewGameClick}
                >
                    Add Game
                </Button><br/>
                <Link to="/">
                    <button 
                    className='done-button' 
                    onClick={handleDone}
                    >
                        Done
                    </button>
                </Link>
            </div>
        </div>
    )
}

