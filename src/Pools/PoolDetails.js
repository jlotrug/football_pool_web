import React, {useContext, useEffect, useState, useReducer} from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

import AuthenticationContext from "../Context/AuthenticationContext";
import { FetchData } from "../API/FetchData";
import { PoolDetailsReducer } from '../Reducers/PoolDetailsReducer';
import { ViewPicks } from '../Picks/ViewPicks';

const playersUrl = "http://localhost:8000/api/v1/players?poolid="
const gamesUrl = "http://localhost:8000/api/v1/games?poolid="

export const PoolDetails = ({league_id, pool}) => {
    const {user, authTokens} = useContext(AuthenticationContext)
    const [activePlayersClass, setActivePlayersClass] = useState('active-players')
    const [viewPicksClass, setviewPicksClass] = useState('hide-element')
    const [selectedPlayer, setSelectedPlayer] = useState(null)
    const [poolDetailsState, dispatchPoolDetailsState] = useReducer(
        PoolDetailsReducer, {players: [], games: [], isLoading: false, isError: false}
    )

    useEffect(() => {
        FetchData(playersUrl+pool.id, dispatchPoolDetailsState, 'PLAYERS', authTokens.access)
    }, [])

    const handleSelectedPlayer = (player) => {
        setSelectedPlayer(player)
        setActivePlayersClass('hide-element')
        setviewPicksClass("picks-form-div")
        FetchData(gamesUrl+pool.id, dispatchPoolDetailsState, 'GAMES', authTokens.access)
    }

    const handleShowActivePlayers = () => {
        setActivePlayersClass('active-players')
        setSelectedPlayer(null)
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
                    <Button 
                        size="lg" 
                        variant="outline-dark" 
                        className= "button-style"
                        onClick={handleShowActivePlayers}
                    >
                    Active Players
                    </Button>
          
            </div>
            <div className={activePlayersClass}>
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
                                onClick={() => handleSelectedPlayer(player)}
                            >
                                {player.first_name} {player.last_name}
                            </Button>
                        </li>
                    ))}
                </ul>                    
            </div> 
            <div className={viewPicksClass}>
                {
                    selectedPlayer && <ViewPicks games={poolDetailsState.games} player={selectedPlayer}/>
                }
            </div> 
        </div>
    )
                
}