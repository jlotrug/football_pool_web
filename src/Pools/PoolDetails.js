import React, {useContext, useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

import AuthenticationContext from "../Context/AuthenticationContext";




export const PoolDetails = ({league_id, pool}) => {
    const {user, authTokens} = useContext(AuthenticationContext)
    // const navigate = useNavigate();

    const handleEditPool = () => {
        // navigate('/pool-form', {replace: true, state: {league_id:league_id, pool: pool}})
    }


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
        </div>
    )
                
}