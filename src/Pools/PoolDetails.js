import React, {useContext, useEffect, useState, useReducer} from 'react'
import Button from 'react-bootstrap/Button'

import AuthenticationContext from "../Context/AuthenticationContext";
import { FetchData } from "../API/FetchData";
import { PoolDetailsReducer } from '../Reducers/PoolDetailsReducer';
import { ViewPicks } from '../Picks/ViewPicks';
import { PoolForm } from './PoolForm';
import {PickWinners} from '../Winners/PickWinners'
import {DisplayScores} from '../Winners/DisplayScores'
import { DisplayActivePlayers } from './DisplayActivePlayers';
import { manageVisibility } from '../HelperMethods';

const playersUrl = "http://localhost:8000/api/v1/players?poolid="
const gamesUrl = "http://localhost:8000/api/v1/games?poolid="
const gamecardsUrl = "http://localhost:8000/api/v1/gamecards?poolid="

export const PoolDetails = ({league_id, pool}) => {
    const {authTokens} = useContext(AuthenticationContext)
    const [activePlayersClass, setActivePlayersClass] = useState('active-players')
    const [viewPicksClass, setViewPicksClass] = useState('hide-element')
    const [editPoolClass, setEditPoolClass] = useState('hide-element')
    const [pickWinnersClass, setPickWinnersClass] = useState('hide-element')
    const [displayScoresClass, setDisplayScoresClass] = useState('hide-element')
    
    const [selectedPlayer, setSelectedPlayer] = useState(null)
    const [poolDetailsState, dispatchPoolDetailsState] = useReducer(
        PoolDetailsReducer, {players: [], games: [], gamecards: false, isLoading: false, isError: false}
    )

    useEffect(() => {
        FetchData(playersUrl+pool.id, dispatchPoolDetailsState, 'PLAYERS', authTokens.access)
        FetchData(gamesUrl+pool.id, dispatchPoolDetailsState, 'GAMES', authTokens.access)
    }, [])

    const handleSelectedPlayer = (player) => {
        setSelectedPlayer(player)
        manageVisibility(setViewPicksClass, "picks-form-div", [setActivePlayersClass])
    }

    const handleShowActivePlayers = () => {
        manageVisibility(setActivePlayersClass, 'active-players', [setEditPoolClass, setPickWinnersClass, setDisplayScoresClass])
        setSelectedPlayer(null)
    }

    const handlePickWinners = () => {
        manageVisibility(setPickWinnersClass, 'picks-form-div', [setActivePlayersClass, setEditPoolClass, setDisplayScoresClass])
        setSelectedPlayer(null)        
    }

    const handleEditPool = () => {
        manageVisibility(setEditPoolClass,'edit-pool', [setActivePlayersClass, setPickWinnersClass, setDisplayScoresClass])
        setSelectedPlayer(null)
    }

    const calculatePlayerScores = () => {
        FetchData(gamecardsUrl+pool.id, dispatchPoolDetailsState, 'GAMECARD', authTokens.access)
        manageVisibility(setDisplayScoresClass, 'display-scores', [setPickWinnersClass])
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
                <DisplayActivePlayers poolDetailsState={poolDetailsState} handleSelectedPlayer={handleSelectedPlayer} />
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
                <PickWinners games={poolDetailsState.games} calculatePlayerScores={calculatePlayerScores}/>
            </div>

            <div className={displayScoresClass}>
                {
                    poolDetailsState.gamecards && <DisplayScores gamecards={poolDetailsState.gamecards}/>
                }
            </div>
        </div>
    )                
}