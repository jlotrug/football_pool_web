import React, { useCallback } from "react";
import { getTokenHeaders } from "./APIFunctions";
import axios from "axios";
import { NewPickReducer } from "./PickReducer";


const url = "http://127.0.0.1:8000/api/v1/picks/"

// Removing currentPool
export const PickForm = ({game, triggerDone, resetDone}) => {
    const [pick, setPick] = React.useState();
    const [selectedPick, dispatchSelectedPick] = React.useReducer(
        NewPickReducer, {data:{}, isLoading: false, isError: false}
    )
    
    React.useEffect(() => {   
          
        if(!triggerDone) return;
        console.log(triggerDone)
        newPickCreate() 
        resetDone()

    }, [triggerDone])

    const newPickCreate = useCallback(async() => {
        // console.log(pick)
        dispatchSelectedPick({type: 'NEW_PICK_INIT'})

        const pickData = {choice: pick, game: game.id, user: localStorage['user_id']}
        // let pickData = {choice: pick, game: game.id, user: localStorage['user_id']}
        console.log(Object.keys(selectedPick.data))

        try{
            let result

            // On first submit, it creates a new pick, if submitted again the pick is edited
            if(Object.keys(selectedPick.data).length === 0){ result = await axios.post(url, pickData, getTokenHeaders())}
            else { result = await axios.put(url + selectedPick.data.id + '/', pickData, getTokenHeaders())}

            dispatchSelectedPick({
                type: 'NEW_PICK_SUCCESS',
                payload: result.data
            })
        }catch(e){
            console.log(e)
            dispatchSelectedPick({type: 'NEW_PICK_FAILURE'})
        }
    },[triggerDone])

    // Tracks the current selection 
    const handleSelection = (e) => {
        setPick(e.target.value)
        console.log(e.target.value);
        console.log(pick)
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