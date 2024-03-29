import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button'
import { PutPostData } from "../API/PutPostData"
import AuthenticationContext from "../Context/AuthenticationContext";
import { PickWinnersReducer } from "../Reducers/PickWinnersReducer";

const gamesUrl = process.env.REACT_APP_SEVER_URL + "/api/v1/games/"

export const PickWinners = ({games, calculatePlayerScores}) => {
    const [triggerDone, setTriggerDone] = useState(false)
    const [makePicksFormClass, setMakePicksFormClass] = useState('make-picks-form')
    const [winnersSubmittedClass, setwinnersSubmittedClass] = useState('hide-element')

    const handleDone = () => {
        setTriggerDone(true)
        setMakePicksFormClass('hide-element')
        setwinnersSubmittedClass('winners-submited')
    }

    return (
        <div>
            <div className={makePicksFormClass}>
                <h1>Make Winning Picks</h1>
                <ul className='no-bullet'>
                    {
                        games.map(game => {
                            console.log(game)
                            return <Pick 
                                        key={game.id} 
                                        game={game}
                                        triggerDone={triggerDone} 
                                    />
                            })
                    }
                </ul>
                <button className='done-button' onClick={handleDone}>Done</button>
            </div>
            <div className={winnersSubmittedClass}>
                <h2>Winners Submited!</h2>
                <Button 
                        size="lg" 
                        variant="outline-dark" 
                        className= "button-style"
                        onClick={calculatePlayerScores}
                    >
                    Calculate Player Scores
                </Button>
            </div>
        </div>
    )
}


const Pick = ({game, triggerDone}) => {
    const {user, authTokens} = useContext(AuthenticationContext)
    const [winner, setWinner] = React.useState(false);

    const [winnerPick, setWinnerPick] = React.useReducer(
        PickWinnersReducer, {game:false, isLoading: false, isError: false}
    )

    useEffect(() => {
        if(triggerDone){
            const gameData = {team_one: game.team_one, team_two: game.team_two, winner: winner, pool: game.pool}
            PutPostData(gamesUrl+game.id +'/', setWinnerPick, 'GAME_EDIT', false, gameData, authTokens.access)
        }
    }, [triggerDone])

    // React.useEffect(() => {
    //     FetchData(pickCheckUrl+game.id+'&player='+player.id, dispatchSelectedPick, 'PICK', authTokens.access)
    // }, [])

    // useEffect(() => {
    //     if(setWinnerPick.pick){
    //         setPick(selectedPick.pick.choice)
    //     } 
    // }, [selectedPick.pick])

    const handleSelection = (e) => {
        // if(!winner){ confirmPick() }
        setWinner(e.target.value)        
    }



    return(
        <li>
            <form className='pick-form'>
                <label className='left-pick'>
                    <input 
                        type="radio"
                        value={game.team_one}
                        name="game-pick"
                        className='radio-pick'
                        onChange={handleSelection}
                    />
                    {game.team_one}
                </label>
                <label className='right-pick'>
                {game.team_two}
                    <input 
                        type="radio"
                        value={game.team_two}
                        name="game-pick"
                        className='radio-pick'
                        onChange={handleSelection}
                    />
                </label>
                
            </form>
        </li>
    )
}