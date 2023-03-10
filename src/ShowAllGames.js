import React, { useCallback, useEffect } from 'react'
import './MakePicksFormStyle.css'
import {selectedGamesReducer} from './GamePoolReducers';
import { PickForm } from './PickForm';
import axios from 'axios';
import { getTokenHeaders } from './APIFunctions';

const url = "http://localhost:8000/api/v1/games?poolid="

export const ShowAllGames = ({pool, done}) => {
    const [games, dispatchGames] = React.useReducer(
        selectedGamesReducer, {data: [], isLoading: false, isError: false}
    )


    const handleFetchGames = useCallback(async() =>{

        dispatchGames({type: 'GAMES_FETCH_INIT'})

        try{
            const result = await axios.get(url+pool, getTokenHeaders())

            dispatchGames({
                type: 'GAMES_FETCH_SUCCESS',
                payload: result.data
            
            })
            console.log(result)
        }catch(e){
            console.log(e)
            dispatchGames({type: 'GAMES_FETCH_FAILURE'})
        }
    
    }, [])

    useEffect(() => {

        if(!pool) return
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
                            // triggerDone={done}
 
                            // resetDone={resetDone}
                            />
                        })
                }
            </ul>
        </div>
    )
    
}