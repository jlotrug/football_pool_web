import React, { useEffect } from 'react'
import './MakePicksFormStyle.css'
import { poolsReducer } from './GamePoolReducers';
import { createMockPools, createMockGames } from './MockClasses';
// import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';

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
    const [games, setGames] = React.useState([])
    const [allPoolsClass, setAllPoolsClass] = React.useState("all-pools")
    const [picksForm, setPicksForm] = React.useState("hide-element")
    const [currentPool, setCurrentPool] = React.useState()

    const [pools, dispatchPools] = React.useReducer(
        poolsReducer, {data: [], isLoading: false, isError: false}
    )

        useEffect(() => {
            dispatchPools({type: 'POOLS_FETCH_INIT'})

            getAsyncPools().then(result => {
                dispatchPools({
                    type: 'POOLS_FETCH_SUCCESS',
                    payload: result.data.pools
                })
            }).catch(() => dispatchPools({type: 'POOLS_FETCH_FAILURE'}))
        }, [])

    React.useEffect(() => {
        setAllPoolsClass("all-pools")
        setPicksForm("hide-element")
    }, [formClass])

    // Hides list of pools and shows div with Pool Form
    const poolSelected = () => {
        setAllPoolsClass("hide-element")
        setPicksForm("picks-form-div")
    }

    const fetchGames = (week) => {
        const allGames = createMockGames();

        return allGames.filter(game => {
            return game.getPoolId() === week.getId()
        })
    }    

    const handlePoolSelect = (e) => {
        const selectedPool = pools.data.find(pool => {
           return pool.getId() === e
        })
        
        poolSelected()
       
        setCurrentPool(selectedPool)
        setGames(fetchGames(selectedPool))

        console.log(games)
    }

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
                <ul className='no-bullet'>
                    {games.map(game => (
                        <PickForm key={game.getGameId()} game={game} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

const PickForm = ({game}) => {



    return(
        <li>
            <form className='pick-form'>
                <label className='left-pick'>
                    <input 
                        type="radio"
                        value={game.teamOne}
                        name="game-pick"
                        className='radio-pick'
                    />
                    {game.teamOne}
                </label>
                <label className='right-pick'>
                {game.teamTwo}
                    <input 
                        type="radio"
                        value={game.teamTwo}
                        name="game-pick"
                        className='radio-pick'
                    />
                    
                </label>
            </form>
        </li>
    )
}