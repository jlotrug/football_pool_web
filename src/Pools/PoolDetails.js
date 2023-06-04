import React, {useContext, useEffect, useState, useReducer} from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

import AuthenticationContext from "../Context/AuthenticationContext";
import { FetchData } from "../API/FetchData";
import { PoolDetailsReducer } from '../Reducers/PoolDetailsReducer';

const playersUrl = "http://localhost:8000/api/v1/players?poolid="

export const PoolDetails = ({league_id, pool}) => {
    const {user, authTokens} = useContext(AuthenticationContext)
    const [poolDetailsState, dispatchPoolDetailsState] = useReducer(
        PoolDetailsReducer, {players: [], isLoading: false, isError: false}
    )

    useEffect(() => {
        FetchData(playersUrl+pool.id, dispatchPoolDetailsState, 'PLAYERS', authTokens.access)
    }, [])



    return(
        <div className='pool-details'>
            <div className="button-container">        
                <Link to={!!user ? "/pool-form" : "/"} state={{league_id: league_id, pool: pool}}>
                    <Button 
                        size="lg" 
                        variant="outline-dark" 
                        className= "button-style"
                    >
                    Edit Pool
                    </Button>
                </Link>
                <Link to={!!user ? "/pool-form" : "/"} state={{league_id: league_id, pool: pool}}>
                    <Button 
                        size="lg" 
                        variant="outline-dark" 
                        className= "button-style"
                    >
                    Pick Winners
                    </Button>
                </Link>    
          
            </div>
            <div className='active-players'>
                <h1>Active Players</h1>
                <ul className='no-bullet'>
                    {poolDetailsState.isError &&<p>Something went wrong...</p>}
                
                    {poolDetailsState.isLoading ? (<p>Loading...</p>):
                    poolDetailsState.players.map(player =>(

                        <li key={player.id}>
                            <Button 
                            className='button-style player-button'
                            size='lg'
                            variant='outline-dark'
                            // onClick={() => handleSelectedPool(pool)}
                            >
                                {player.first_name} {player.last_name}
                            </Button>
                        </li>
                    ))}
                </ul>                    
            </div>  
        </div>
    )
                
}