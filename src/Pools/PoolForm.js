import '../static/style/App.css';
import React, {useContext, useEffect, useReducer} from 'react';
import Button from 'react-bootstrap/Button'
import { useLocation } from "react-router-dom"
import { Link } from 'react-router-dom';

import AuthenticationContext from "../Context/AuthenticationContext";
import { FetchData } from "../API/FetchData";
import { PutPostData } from '../API/PutPostData';
import {selectedGamesReducer} from '../Reducers/GamePoolReducers';
import {NewPoolReducer} from '../Reducers/NewPoolReducer'
import { poolFormReducer } from '../Reducers/PoolFormReducer';
import { NewGameReducer } from '../Reducers/NewGameReducer';
import { GameForm } from '../Games/NewGameForm';
import { NameForm } from './NameForm';



const gamesUrl = "http://localhost:8000/api/v1/games/"
const fetchGamesUrl = "http://localhost:8000/api/v1/games?poolid="


export const PoolForm = () => {
    const location = useLocation();
    const league_id = location.state.league_id
    const pool = location.state.pool
    const [newGameDisabled, setNewGameDisabled] = React.useState(false)
    const {authTokens} = useContext(AuthenticationContext)
    const [poolFormState, dispatchPoolFormState] = useReducer(
        poolFormReducer, {league_id: league_id, pool: pool ? pool : null, games: [], isLoading: false, isError: false}
    )
    const [newGame, dispatchGame] = React.useReducer(
        NewGameReducer, {data:[], isLoading: false, isError: false}
    )
    const [games, dispatchFetchedGames] = React.useReducer(
        selectedGamesReducer, {data:[], isLoading: false, isError: false}
    )
    // const [newPool, dispatchNewPool] = React.useReducer(
    //     NewPoolReducer, {data: [], isLoading: false, isError: false}
    // )
      const [newPool, dispatchNewPool] = React.useReducer(
        NewPoolReducer, {data: pool ? [pool] : [], isLoading: false, isError: false}
    )
    
 
    useEffect(() => {
        console.log(poolFormState.games)
        if(pool){
            // FetchData(fetchGamesUrl+pool.id, dispatchFetchedGames, 'GAMES', authTokens.access)
            FetchData(fetchGamesUrl+pool.id, dispatchPoolFormState, 'GAMES', authTokens.access)
            // .then(() => {
            //     dispatchGame({
            //         type: 'NEW_GAME_SUCCESS',
            //         payload: [fetchedGames.data]
            //     })
            //     // games.data = fetchedGames.data
            //     console.log(games.data)
            // })
        }
        
    }, [])

    const createNewGame = () => {
        
        if(poolFormState.pool){
            console.log(newPool)
            // PutPostData(gamesUrl, dispatchGame,'GAME', true, {pool: newPool.data[0].id,}, authTokens.access, games.data)
            PutPostData(gamesUrl, dispatchPoolFormState,'GAME', true, {pool: poolFormState.pool.id,}, authTokens.access, poolFormState.games)
            console.log(newGame)
            games.data.push(newGame.data.pop())
        }
        // games.data.push({id: 10, team_one: 'Eagles', team_two: 'Raiders', winner: null, pool: 10})
        // PutPostData(gamesUrl, dispatchGame,'GAME', true, {pool: newPool.data[0].id,}, games.data)
        
    }
    

    return(
        <div className="">
            {/* {console.log(newPool)} */}
            <NameForm 
            // poolDispatch={dispatchNewPool}
            poolDispatch={dispatchPoolFormState}
            setNewGameDisabled={setNewGameDisabled}
            // pool = {newPool.data[0]}
            pool = {poolFormState.pool}            
            league_id = {poolFormState.league_id}
            />
            <div>
                <ul className='no-bullet'>
                    {/* {games.data.map(game => { */}
                    {poolFormState.games.map(game => {
                        console.log(poolFormState.games)
                       const id = game.id
                       // Passes id down as a prop so it can be accessed
                    return <GameForm 
                            key={id} 
                            gameId={id} 
                            game={game}
                            // handleCallback={handleGameSubmit}
                            poolId = {poolFormState.pool.id}
                            />
                    })}
                </ul>

                <Button 
                variant='btn btn-dark' 
                disabled={newGameDisabled}
                onClick={createNewGame}
                >
                    Add Game
                </Button><br/>
                <Link to="/">
                    <button 
                    className='done-button' 
                    // onClick={handleDone}
                    >
                        Done
                    </button>
                </Link>
            </div>
        </div>
    )
}