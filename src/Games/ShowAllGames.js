import React, { useCallback, useEffect } from 'react'
import '../static/style/MakePicksFormStyle.css'
import {selectedGamesReducer} from '../Reducers/GamePoolReducers';
import { PickForm } from '../Picks/PickForm';
import { FetchData } from '../API/FetchData';

const url = "http://localhost:8000/api/v1/games?poolid="

export const ShowAllGames = ({pool, games, triggerDone, resetDone, handleAllPicksMade}) => {
    const [numPicks, setNumPicks] = React.useState(1)
    // const [games, dispatchGames] = React.useReducer(
    //     selectedGamesReducer, {data: [], isLoading: false, isError: false}
    // )

    // Once games[] is set with all fetched games, sets numPicks to number of picks for that pool
    React.useEffect(() => {
        if(games.length === 0) return

        setNumPicks(games.length)

        // Tells parent to disable Done until all picks are made
        // handleAllPicksMade()
    }, [games])


    // Callback function to decrement numPicks for PickForm components
    // After first selection is made for each game pick, the number decrements
    const decrementNumPicks = () =>{
        console.log(numPicks)
        const newNumPicks = numPicks - 1
        setNumPicks(newNumPicks)
    }

    // Checks if all choices have been made, numPicks equals 0. Informs parent when they have.
    React.useEffect(() => {
        // if(numPicks === 0) handleAllPicksMade()
        if(numPicks <= 0){
            console.log("handle all picks made")
            handleAllPicksMade()
        } 

    }, [numPicks])

    // const handleFetchGames = useCallback(() => {
    //     if(!pool) return

    //     FetchData(url+pool, dispatchGames, 'GAMES')
    // }, [pool])


    // useEffect(() => {
    //     handleFetchGames()
    // }, [handleFetchGames])

    return (
        <div>
            <ul className='no-bullet'>
                {games.isError &&<p>Something went wrong...</p>}

                {games.isLoading ? (<p>Loading...</p>):
                    games.map(game => {
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