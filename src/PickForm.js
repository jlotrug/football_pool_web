import React from "react";
import { getTokenHeaders } from "./APIFunctions";
import axios from "axios";
import { NewPickReducer } from "./PickReducer";


const url = "http://127.0.0.1:8000/api/v1/picks/"

export const PickForm = ({game, triggerDone, currentPool, resetDone}) => {
    const [pick, setPick] = React.useState();
    const [selectedPick, dispatchSelectedPick] = React.useReducer(
        NewPickReducer, {data:{}, isLoading: false, isError: false}
    )
    

    React.useEffect(() => {

       
        if(!triggerDone) return;
        resetDone();
        const pick = {choice: selectedPick, game: game.id}

        newPickCreate()

        // dispatchSelectedPick({type: 'NEW_PICK_INIT'})

        // try{
        //     const result = await axios.post(url, selectedPick, getTokenHeaders())

        //     dispatchSelectedPick({
        //         type: 'NEW_PICK_SUCCESS',
        //         payload: result.data
        //     })
        // }catch(e){
        //     console.log(e)
        //     dispatchSelectedPick({type: 'NEW_PICK_FAILURE'})
        // }


        // try{
        //     const result = await axios.get(url,
        //         pick
        //      ,getTokenHeaders())
            
        // }catch(e){
        //     console.log("hey")
        //     console.log(e)

        // }
        
        // const pick = {gameId: game.id, pick:selectedPick, poolId: currentPool.id}
        console.log(pick)


    }, [triggerDone])
    // }, [triggerDone, game, currentPool, selectedPick])


    const newPickCreate = async() => {
        
        console.log(localStorage['user_id'])

        dispatchSelectedPick({type: 'NEW_PICK_INIT'})

        const pickData = {choice: pick, game: game.id, user: 2}

        try{
            const result = await axios.post(url, pickData, getTokenHeaders())

            dispatchSelectedPick({
                type: 'NEW_PICK_SUCCESS',
                payload: result.data
            })
        }catch(e){
            console.log(e)
            dispatchSelectedPick({type: 'NEW_PICK_FAILURE'})
        }
    }

    // Tracks the current selection 
    const handleSelection = (e) => {
        console.log(e.target.value)
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