import React, { useCallback } from "react";
import { getTokenHeaders } from "./APIFunctions";
import axios from "axios";
import { NewPickReducer } from "./PickReducer";


const url = "http://127.0.0.1:8000/api/v1/picks/"
// const pickCheckUrl = "http://127.0.0.1:8000/api/v1/pick-check?game="
const pickCheckUrl = "http://127.0.0.1:8000/api/v1/picks?game="

// Removing currentPool
export const PickForm = ({game, triggerDone, resetDone, confirmPick}) => {
    const [pick, setPick] = React.useState();
    const [selectedPick, dispatchSelectedPick] = React.useReducer(
        NewPickReducer, {data:{}, isLoading: false, isError: false}
    )

    const checkForPick = async() =>{
        let result

        try{
            result = await axios.get(pickCheckUrl+game.id, getTokenHeaders())
            console.log(result.data)

            if(result.data[0]){
                console.log(result.data[0])
                dispatchSelectedPick({
                    type: 'NEW_PICK_SUCCESS',
                    payload: result.data[0]
                })
            }

        }catch(e){
            console.log(e);
        }
    }

    React.useEffect(() => {
        checkForPick()
    }, [])
    
    // MakePicksComponent toggles triggerDone to true once user clicks 'Done'
    // When triggerDone == true, Pick is created
    React.useEffect(() => {   
        if(!triggerDone) return;
        newPickCreate() 
        resetDone()

    }, [triggerDone])

    // Creates/Edits users Pick
    const newPickCreate = useCallback(async() => {
        dispatchSelectedPick({type: 'NEW_PICK_INIT'})

        // Creates formatted Pick data with users selection
        const pickData = {choice: pick, game: game.id, user: localStorage['user_id']}
        console.log(selectedPick)
        try{
            // console.log(localStorage['user_id']);
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

    // Updates pick with user selection
    // If pick is undefined, then this is the first selection for this game and parent is notified a pick has been made
        // If user changes pick, the parent is not notified again
    const handleSelection = (e) => {
        if(!pick){ confirmPick() }
        setPick(e.target.value)
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