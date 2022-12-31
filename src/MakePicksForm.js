import React, { useCallback, useEffect } from 'react'
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
    const [done, setDone] = React.useState(false)

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

        // console.log(games)
    }

    const handleDone = () => {
        // alert("Hello")
        setDone(true)
        // console.log(done)
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
                        <PickForm 
                        key={game.getGameId()} 
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

const PickForm = ({game, triggerDone, currentPool, resetDone}) => {
    const [selectedPick, setSelectedPick] = React.useState();

    React.useEffect(() => {
        // console.log(done)
        if(!triggerDone) return;
        resetDone();
        
        const pick = {gameId: game.getGameId(), pick:selectedPick, poolId: currentPool.getId()}
        console.log(pick)
    }, [triggerDone, game, currentPool, selectedPick])


    const handleSelection = (e) => {
        console.log(e.target.value)
        setSelectedPick(e.target.value)
    }

    return(
        <li>
            <form className='pick-form'>
                <label className='left-pick'>
                    <input 
                        type="radio"
                        value={game.teamOne}
                        name="game-pick"
                        className='radio-pick'
                        onChange={handleSelection}
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
                        onChange={handleSelection}
                    />
                    
                </label>
            </form>
        </li>
    )
}