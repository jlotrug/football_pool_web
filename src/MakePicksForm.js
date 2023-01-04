import React, { useCallback, useEffect } from 'react'
import './MakePicksFormStyle.css'
import { poolsReducer, selectedGamesReducer } from './GamePoolReducers';
import { createMockPools, createMockGames } from './MockClasses';
import { FetchPools } from './FetchPools';
import { PickForm } from './PickForm';
import axios from 'axios';
// import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';

const pools = createMockPools();

// const getAsyncPools = () => {
//     return new Promise(resolve =>
//         setTimeout(
//             () => resolve({data: {pools: pools}}),
//             2000 // Mocking wait time to fetch data
//         )
//     )
//     // return new Promise(resolve =>
//     //     setTimeout(
//     //         () => resolve({data: {pools: pools}}),
//     //         2000 // Mocking wait time to fetch data
//     //     )
//     // )
// }
const gamesUrl = "http://localhost:8080/api/games?pool="
const url = "http://localhost:8080/api/pools"
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
                const result = await axios.get(url)
                console.log(result.data)
                dispatchPools({
                    type: 'POOLS_FETCH_SUCCESS',
                    payload: result.data
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

    const fetchGames = async(pool) => {
        // const allGames = createMockGames();

        // return allGames.filter(game => {
        //     return game.getPoolId() === week.id
        // })
            try{
                const result = await axios.get(gamesUrl+pool.id)
                // console.log(result.data)
                // setGames(result.data)
                return result.data
                
            }catch{
                
            }
        
    }    


    const handlePoolSelect = async(e) => {
        const selectedPool = pools.data.find(pool => {
        //    return pool.getId() === e
                // console.log(pool)
                return pool.id === e
        })
        
        poolSelected()
        setCurrentPool(selectedPool)

        dispatchGames({type: 'GAMES_FETCH_INIT'})

        try{
            const result = await axios.get(gamesUrl+selectedPool.id)

            dispatchGames({
                type: 'GAMES_FETCH_SUCCESS',
                payload: result.data
            
            })
        }catch{
            dispatchGames({type: 'GAMES_FETCH_FAILURE'})
        }

    }

    const handleDone = () => {
        // alert("Hello")
        setDone(true)
        // console.log(done)
        // FetchPools()

        // try{
        //     const result = axios.post("http://localhost:8080/api/pools/", {
        //         pool_name: "Week 100"
        //     }).then( response =>{
        //         console.log(response)
        //     })
        //     console.log(result)
        // }catch{
        //     console.log("")
        // }
        

    }

    const resetDone = () =>{
        setDone(false)
    }

    // const pickUrl = "http://localhost:8080/api/games/"
    
    // const testClick = async() => {
    //     try{
    //         const result = await axios.get(gamesUrl+pool.id)

    //         console.log(result)
    //     }catch{
            
    //     }
    // }

    return(
        <div className={formClass}>
            <div className={allPoolsClass}>
                <h2 className='pools-heading'>Pick a Pool</h2>
                    <ul className='no-bullet'>
                        {pools.isError &&<p>Something went wrong...</p>}
                        {/* <button onClick={testClick}>TEST CLICK</button> */}
                        {/* {pools.isLoading ? (<p>Loading...</p>):
                        pools.data.map(pool =>(
                            <li key={pool.getId()}>
                                <button 
                                className='pool-button'

                                // This is how you pass data into 
                                onClick={() => handlePoolSelect(pool.getId())}
                                >
                                    {pool.getName()}
                                </button>
                            </li>
                        ))} */}
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
                    {games.data.map(game => (
                        <PickForm 
                        key={game.id} 
                        game={game}  
                        triggerDone={done}
                        currentPool={currentPool}
                        resetDone={resetDone}
                        />
                    ))}
                </ul>
                <button className='done-button' onClick={handleDone}>Done</button>
            </div>
        </div>
    )
}

