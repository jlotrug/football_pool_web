import '../static/style/App.css';
import React, {useContext, useEffect, useReducer} from 'react';
import Button from 'react-bootstrap/Button'
import { useLocation } from "react-router-dom"
import { Link } from 'react-router-dom';

import AuthenticationContext from "../Context/AuthenticationContext";
import { FetchData } from "../API/FetchData";
import { PutPostData } from '../API/PutPostData';
import { poolFormReducer } from '../Reducers/PoolFormReducer';
import { GameForm } from '../Games/NewGameForm';
import { NameForm } from './NameForm';

const gamesUrl = "http://localhost:8000/api/v1/games/"
const fetchGamesUrl = "http://localhost:8000/api/v1/games?poolid="

export const PoolForm = ({selectedLeague, selectedPool}) => {
    const location = useLocation();
    const league = location.state.league || selectedLeague
    const pool = location.state.pool || selectedPool
    const {authTokens} = useContext(AuthenticationContext)
    const [poolFormState, dispatchPoolFormState] = useReducer(
        poolFormReducer, {league_id: league.id, pool: pool ? pool : null, games: [], isLoading: false, isError: false}
    )
 
    useEffect(() => {
        if(pool){
            FetchData(fetchGamesUrl+pool.id, dispatchPoolFormState, 'GAMES', authTokens.access)
        }        
    }, [])

    const createNewGame = () => {
        if(poolFormState.pool){
            PutPostData(gamesUrl, dispatchPoolFormState,'GAME', true, {pool: poolFormState.pool.id,}, authTokens.access)
        }        
    }    

    return(
        <div className="">
            <NameForm 
                poolDispatch={dispatchPoolFormState}
                pool = {poolFormState.pool}            
                league_id = {poolFormState.league_id}
            />
            <div>
                <ul className='no-bullet'>
                    {poolFormState.games.map(game => {
                       const id = game.id
                       // Passes id down as a prop so it can be accessed
                    return <GameForm 
                                key={id} 
                                gameId={id} 
                                game={game}
                                poolId = {poolFormState.pool.id}
                            />
                    })}
                </ul>

                <Button 
                variant='btn btn-dark' 
                onClick={createNewGame}
                >
                    Add Game
                </Button><br/>
                {/* <Link to="/"> */}
                <Link key={league.id} to={!!authTokens ? {pathname:"/leagues/league-details"} : "/"} state={{league:league}}>
                    <button 
                    className='done-button' 
                    >
                        Done
                    </button>
                </Link>
            </div>
        </div>
    )
}