import React, { useCallback, useEffect } from 'react'
import '../static/style/MakePicksFormStyle.css'
import { PickForm } from '../Picks/PickForm';

const url = "http://localhost:8000/api/v1/games?poolid="

export const ShowAllGames = ({games, triggerDone, resetDone, handleAllPicksMade}) => {
    const [numPicks, setNumPicks] = React.useState(1)

    // Once games[] is set with all fetched games, sets numPicks to number of picks for that pool
    React.useEffect(() => {
        if(games.length === 0) return

        setNumPicks(games.length)

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
        // if(numPicks <= 0){
        //     handleAllPicksMade()
        // } 

    }, [numPicks])

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