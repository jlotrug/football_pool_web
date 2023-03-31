import React, { useCallback, useEffect } from 'react'
import '../static/style/MakePicksFormStyle.css'
import {selectedGamesReducer} from '../Reducers/GamePoolReducers';
import { PickForm } from '../Picks/PickForm';
import axios from 'axios';
import { GetTokenHeaders } from "../API/GetTokenHeaders"

const url = "http://localhost:8000/api/v1/games?poolid="

export const ShowAllGames = ({pool, triggerDone, resetDone, handleAllPicksMade}) => {
    const [numPicks, setNumPicks] = React.useState(1)
    const [games, dispatchGames] = React.useReducer(
        selectedGamesReducer, {data: [], isLoading: false, isError: false}
    )

    // Once games[] is set with all fetched games, sets numPicks to number of picks for that pool
    React.useEffect(() => {
        if(games.data.length === 0) return

        setNumPicks(games.data.length)

        // Tells parent to disable Done until all picks are made
        handleAllPicksMade()
    }, [games])


    // Callback function to decrement numPicks for PickForm components
    // After first selection is made for each game pick, the number decrements
    const decrementNumPicks = () =>{
        const newNumPicks = numPicks - 1
        setNumPicks(newNumPicks)
    }

    // Checks if all choices have been made, numPicks equals 0. Informs parent when they have.
    React.useEffect(() => {
        if(numPicks === 0) handleAllPicksMade()

    }, [numPicks])

    

    const handleFetchGames = useCallback(async() =>{
        if(!pool) return

        dispatchGames({type: 'GAMES_FETCH_INIT'})

        try{
            const result = await axios.get(url+pool, GetTokenHeaders())

            dispatchGames({
                type: 'GAMES_FETCH_SUCCESS',
                payload: result.data
            
            })
        }catch(e){
            console.log(e)
            dispatchGames({type: 'GAMES_FETCH_FAILURE'})
        }
    
    }, [pool])

    useEffect(() => {
        handleFetchGames()
    }, [handleFetchGames])

    return (
        <div>
            <ul className='no-bullet'>
                {games.isError &&<p>Something went wrong...</p>}

                {games.isLoading ? (<p>Loading...</p>):
                    games.data.map(game => {
                        return <PickForm 
                            key={game.id} 
                            game={game}  
                            triggerDone={triggerDone}
                            resetDone={resetDone}
                            confirmPick={decrementNumPicks}
                            />
                        })
                }
            </ul>
        </div>
    )
    
}