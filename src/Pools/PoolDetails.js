import React, {useContext, useEffect, useState, useReducer} from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

import AuthenticationContext from "../Context/AuthenticationContext";
import { FetchData } from "../API/FetchData";
import { PoolDetailsReducer } from '../Reducers/PoolDetailsReducer';

const playersUrl = "http://localhost:8000/api/v1/players/"

export const PoolDetails = ({league_id, pool}) => {
    const {user, authTokens} = useContext(AuthenticationContext)
    const [poolDetailsState, dispatchPoolDetailsState] = useReducer(
        PoolDetailsReducer, {players: [], isLoading: false, isError: false}
    )



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
                <Link to={!!user ? "/pool-form" : "/"} state={{league_id: league_id, pool: pool}}>
                    <Button 
                        size="lg" 
                        variant="outline-dark" 
                        className= "button-style"
                    >
                    See All Players
                    </Button> 
                </Link>           
            </div>  
        </div>
    )
                
}