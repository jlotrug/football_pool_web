import React, { useCallback, useEffect } from 'react'
import './MakePicksFormStyle.css'
import {selectedGamesReducer} from './GamePoolReducers';
import { PickForm } from './PickForm';
import axios from 'axios';
import { getTokenHeaders } from './APIFunctions';

const url = "http://localhost:8000/api/v1/games?poolid="

export const ShowAllGames = ({pool, triggerDone, resetDone}) => {
    const [games, dispatchGames] = React.useReducer(
        selectedGamesReducer, {data: [], isLoading: false, isError: false}
    )


    const handleFetchGames = useCallback(async() =>{
        if(!pool) return



        dispatchGames({type: 'GAMES_FETCH_INIT'})

        try{
            const result = await axios.get(url+pool, getTokenHeaders())

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
                            />
                        })
                }
            </ul>
        </div>
    )
    
}