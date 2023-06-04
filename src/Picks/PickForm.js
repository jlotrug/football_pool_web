import React, { useCallback, useContext, useEffect } from "react";
import { NewPickReducer } from "../Reducers/PickReducer";
import { PutPostData } from "../API/PutPostData";
import { FetchData } from '../API/FetchData';
import AuthenticationContext from "../Context/AuthenticationContext";

const pickSubmitUrl = "http://127.0.0.1:8000/api/v1/picks/"
const pickCheckUrl = "http://127.0.0.1:8000/api/v1/pick-check?game="

// Removing currentPool
export const PickForm = ({game, triggerDone, resetDone, confirmPick}) => {
    const {user, authTokens} = useContext(AuthenticationContext)
    const [pick, setPick] = React.useState(false);
    const [selectedPick, dispatchSelectedPick] = React.useReducer(
        NewPickReducer, {pick:false, isLoading: false, isError: false}
    )
    React.useEffect(() => {
        FetchData(pickCheckUrl+game.id, dispatchSelectedPick, 'PICK', authTokens.access)
    }, [])
    
    // MakePicksComponent toggles triggerDone to true once user clicks 'Done'
    // When triggerDone == true, Pick is created
    React.useEffect(() => {   
        if(!triggerDone) return;
        newPickCreate() 
        resetDone()

    }, [triggerDone])

    // Creates/Edits users Pick
    const newPickCreate = useCallback(() => {
        // Creates formatted Pick data with users selection
        const pickData = {choice: pick, game: game.id, user: user.id}

        try{
            let url = pickSubmitUrl
            let isPost = true
            if(selectedPick.pick){
                isPost = false
                url += selectedPick.pick.id + '/'
            }
            PutPostData(url, dispatchSelectedPick, 'PICK', isPost, pickData, authTokens.access)
        }catch(e){
            console.log(e)
        }
    },[triggerDone])

    // Updates pick with user selection
    // If pick is undefined, then this is the first selection for this game and parent is notified a pick has been made
        // If user changes pick, the parent is not notified again
    const handleSelection = (e) => {
        if(!pick){ confirmPick() }
        setPick(e.target.value)        
    }
    // If pick was already made, sets pick state with choice
    useEffect(() => {
        if(selectedPick.pick){
            setPick(selectedPick.pick.choice)
            confirmPick()
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
                        onChange={handleSelection}
                        checked={pick && (pick == game.team_one)}
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
                        checked={pick && (pick == game.team_two)}
                    />
                </label>
            </form>
        </li>
    )
}