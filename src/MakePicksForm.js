import React, { useEffect } from 'react'
import './MakePicksFormStyle.css'
import { poolsReducer } from './GameWeekReducers';
import { createMockPools, createMockGames } from './MockClasses';
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';

const pools = createMockPools();

const getAsyncPools = () => {
    return new Promise(resolve =>
        setTimeout(
            () => resolve({data: {pools: pools}}),
            2000 // Mocking wait time to fetch data
        )
    )
}


export const MakePicksForm = ({formClass}) => {
    // const [weeks, setWeeks] = React.useState([])
    const [games, setGames] = React.useState([])
    const [allPoolsClass, setAllPoolsClass] = React.useState("all-pools")
    const [picksForm, setPicksForm] = React.useState("hide-element")
    const [currentWeek, setCurrentWeek] = React.useState()

    const [pools, dispatchPools] = React.useReducer(
        poolsReducer, {data: [], isLoading: false, isError: false}
    )

        useEffect(() => {
            dispatchPools({type: 'POOLS_FETCH_INIT'})
            console.log(pools.data.isLoading)

            getAsyncPools().then(result => {
                dispatchPools({
                    type: 'POOLS_FETCH_SUCCESS',
                    payload: result.data.pools
                })
            }).catch(() => dispatchPools({type: 'POOLS_FETCH_FAILURE'}))
            // console.log(pools.data)
        }, [])

    // React.useEffect(() => {
    //     setWeeks(createMockPools)
    // },[])

    // Reset MakePicksForm when heading is clicked
    React.useEffect(() => {
        setAllPoolsClass("all-pools")
        setPicksForm("hide-element")
    }, [formClass])

    const poolSelected = () => {
        setAllPoolsClass("hide-element")
        setPicksForm("picks-form-div")
    }

    const fetchGames = (week) => {
        // console.log(week)
        const allGames = createMockGames();

        return allGames.filter(game => {
            // console.log(game)
            return game.getPoolId() === week.getId()
        })
    }

    

    const handlePoolSelect = (e) => {
        // console.log(e)
        const selectedWeek = pools.find(pool => {
           return pool.getId() === e
        })
        // console.log(selectedWeek)
        poolSelected()
       

        setCurrentWeek(selectedWeek)

        setGames(fetchGames(currentWeek))
        // console.log("error catch reached")
        
        // console.log(currentWeek)
        // console.log(fetchGames(currentWeek))
        

        console.log(games)
    }

    // console.log(classForm)
    return(
        <div className={formClass}>
            <div className={allPoolsClass}>
                <h2 className='pools-heading'>Pick a Pool</h2>
                    <ul className='no-bullet'>
                        {pools.isError &&<p>Something went wrong...</p>}
                        {pools.isLoading ? (<p>Loading...</p>):
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
                        ))}
                    </ul>
            </div>

            <div className={picksForm}>

            </div>

        </div>
    )

}