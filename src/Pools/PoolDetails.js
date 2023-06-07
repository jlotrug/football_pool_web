import React, {useContext, useEffect, useState, useReducer} from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

import AuthenticationContext from "../Context/AuthenticationContext";
import { FetchData } from "../API/FetchData";
import { PoolDetailsReducer } from '../Reducers/PoolDetailsReducer';
import { ViewPicks } from '../Picks/ViewPicks';
import { PoolForm } from './PoolForm';
import {PickWinners} from '../Winners/PickWinners'

const playersUrl = "http://localhost:8000/api/v1/players?poolid="
const gamesUrl = "http://localhost:8000/api/v1/games?poolid="

export const PoolDetails = ({league_id, pool}) => {
    const {user, authTokens} = useContext(AuthenticationContext)
    const [activePlayersClass, setActivePlayersClass] = useState('active-players')
    const [viewPicksClass, setviewPicksClass] = useState('hide-element')
    const [editPoolClass, setEditPoolClass] = useState('hide-element')
    const [pickWinnersClass, setPickWinnersClass] = useState('hide-element')
    const [selectedPlayer, setSelectedPlayer] = useState(null)
    const [poolDetailsState, dispatchPoolDetailsState] = useReducer(
        PoolDetailsReducer, {players: [], games: [], picks: [], isLoading: false, isError: false}
    )

    useEffect(() => {
        FetchData(playersUrl+pool.id, dispatchPoolDetailsState, 'PLAYERS', authTokens.access)
        FetchData(gamesUrl+pool.id, dispatchPoolDetailsState, 'GAMES', authTokens.access)
    }, [])

    const handleSelectedPlayer = (player) => {
        setSelectedPlayer(player)
        setActivePlayersClass('hide-element')
        setviewPicksClass("picks-form-div")
        // FetchData(gamesUrl+pool.id, dispatchPoolDetailsState, 'GAMES', authTokens.access)
    }

    const handleShowActivePlayers = () => {
        setActivePlayersClass('active-players')
        setEditPoolClass('hide-element')
        setPickWinnersClass('hide-element')
        setSelectedPlayer(null)
    }

    const handlePickWinners = () => {
        setActivePlayersClass('hide-element')
        setEditPoolClass('hide-element')
        setPickWinnersClass('picks-form-div')
        setSelectedPlayer(null)        
    }

    const handleEditPool = () => {
        setActivePlayersClass('hide-element')
        setEditPoolClass('edit-pool')
        setPickWinnersClass('hide-element')
        setSelectedPlayer(null)
    }


    return(
        <div className='pool-details'>
            <div className="button-container">        
                    <Button 
                        size="lg" 
                        variant="outline-dark" 
                        className= "button-style"
                        onClick={handleEditPool}
                    >
                    Edit Pool
                    </Button>
                    <Button 
                        size="lg" 
                        variant="outline-dark" 
                        className= "button-style"
                        onClick={handlePickWinners}
                    >
                    Pick Winners
                    </Button>
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
            <div className={editPoolClass}>
                    <PoolForm selectedLeagueID={league_id} selectedPool={pool}/>
            </div>
            <div className={pickWinnersClass}>
                
                <PickWinners games={poolDetailsState.games} dispatchFunction={dispatchPoolDetailsState}/>
            </div>
        </div>
    )
                
}