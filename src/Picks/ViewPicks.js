import React, { useCallback, useContext, useEffect } from "react";
import { NewPickReducer } from "../Reducers/PickReducer";
import { FetchData } from '../API/FetchData';
import AuthenticationContext from "../Context/AuthenticationContext";

const pickCheckUrl = "http://127.0.0.1:8000/api/v1/pick-check?game="

export const ViewPicks = ({games, player}) => {
    return (
        <div>
            <h1>{player.first_name}'s Picks</h1>
            <ul className='no-bullet'>
                {
                    games.map(game => {
                        return <Pick 
                                    key={game.id} 
                                    game={game}  
                                    player={player}
                                />
                        })
                }
            </ul>
        </div>
    )
}

const Pick = ({game, player}) => {
    const {user, authTokens} = useContext(AuthenticationContext)
    const [pick, setPick] = React.useState(false);

    const [selectedPick, dispatchSelectedPick] = React.useReducer(
        NewPickReducer, {pick:false, isLoading: false, isError: false}
    )

    React.useEffect(() => {
        FetchData(pickCheckUrl+game.id+'&player='+player.id, dispatchSelectedPick, 'PICK', authTokens.access)
    }, [])

    useEffect(() => {
        if(selectedPick.pick){
            setPick(selectedPick.pick.choice)
        } 
    }, [selectedPick.pick])

    return(
        <li>
            <form className='pick-form'>
                <label className='left-pick'>
                    <input 
                        type="radio"
                        value={game.team_one}
                        name="game-pick"
                        className='radio-pick'
                        checked={pick && (pick == game.team_one)}
                        readOnly={true}
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
                        checked={pick && (pick == game.team_two)}
                        readOnly={true}
                    />
                </label>
            </form>
        </li>
    )
}