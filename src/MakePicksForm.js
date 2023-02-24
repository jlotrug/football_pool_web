import React, { useCallback, useEffect } from 'react'
import './MakePicksFormStyle.css'
import { poolsReducer, selectedGamesReducer } from './GamePoolReducers';
import { PickForm } from './PickForm';
import axios from 'axios';

const gamesUrl = "http://localhost:8080/api/games?poolid="
// const url = "http://localhost:8080/api/pools"
// const url = "http://localhost:8000/api/v1/pools"
const url = "http://127.0.0.1:8000/api/v1/pools/"

export const MakePicksForm = ({formClass}) => {
    const [allPoolsClass, setAllPoolsClass] = React.useState("all-pools")
    const [picksForm, setPicksForm] = React.useState("hide-element")
    const [currentPool, setCurrentPool] = React.useState()
    const [done, setDone] = React.useState(false)

    const [games, dispatchGames] = React.useReducer(
        selectedGamesReducer, {data: [], isLoading: false, isError: false}
    )

    const [pools, dispatchPools] = React.useReducer(
        poolsReducer, {data: [], isLoading: false, isError: false}
    )

    const handleFetchPools = useCallback(async() =>{

        dispatchPools({type: 'POOLS_FETCH_INIT'})

        try{
            console.log("Token: " + localStorage['session'])
            const result = await axios.get(url,{
                headers: {'Authorization': 'Token ' + localStorage['session']}
            })
            dispatchPools({
                type: 'POOLS_FETCH_SUCCESS',
                payload: result.data,
                
            })
        }catch{
            dispatchPools({type: 'POOLS_FETCH_FAILURE'})
        }

    }, [])

    React.useEffect(() => {
        handleFetchPools()
    }, [handleFetchPools])
    

    React.useEffect(() => {
        setAllPoolsClass("all-pools")
        setPicksForm("hide-element")
    }, [formClass])

    // Hides list of pools and shows div with Pool Form
    const poolSelected = () => {
        setAllPoolsClass("hide-element")
        setPicksForm("picks-form-div")
    }
 

    // When pool is selected, games are shown.
    const handlePoolSelect = async(e) => {
        const selectedPool = pools.data.find(pool => {
                return pool.id === e
        })
        
        poolSelected()
        setCurrentPool(selectedPool)

        dispatchGames({type: 'GAMES_FETCH_INIT'})

        try{
            const result = await axios.get(gamesUrl+selectedPool.id, {
                poolId: 1
            })

            dispatchGames({
                type: 'GAMES_FETCH_SUCCESS',
                payload: result.data
            
            })
            console.log(result)
        }catch{
            dispatchGames({type: 'GAMES_FETCH_FAILURE'})
        }
    }

    const handleDone = () => {
        setDone(true)
    }

    const resetDone = () =>{
        setDone(false)
    }

    return(
        <div className={formClass}>
            <div className={allPoolsClass}>
                <h2 className='pools-heading'>Pick a Pool</h2>
                    <ul className='no-bullet'>
                        {pools.isError &&<p>Something went wrong...</p>}
                    
                        {pools.isLoading ? (<p>Loading...</p>):
                        pools.data.map(pool =>(
                            <li key={pool.id}>
                                <button 
                                className='pool-button'

                                // This is how you pass data into 
                                onClick={() => handlePoolSelect(pool.id)}
                                >
                                    {pool.pool_name}
                                </button>
                            </li>
                        )).reverse()}
                    </ul>
            </div>
            <div className={picksForm}>
                <ul className='no-bullet'>
                    {games.isError &&<p>Something went wrong...</p>}

                    {games.isLoading ? (<p>Loading...</p>):
                    games.data.map(game => {
                        // if(game.team_one && game.team_two){

                            return <PickForm 
                                key={game.id} 
                                game={game}  
                                triggerDone={done}
                                currentPool={currentPool}
                                resetDone={resetDone}
                                />
                        // }
                    })}
                </ul>
                <button className='done-button' onClick={handleDone}>Done</button>
            </div>
        </div>
    )
}

