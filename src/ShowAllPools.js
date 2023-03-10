import React, { useCallback, useEffect } from 'react'
import './MakePicksFormStyle.css'
import { poolsReducer} from './GamePoolReducers';
import axios from 'axios';
import { getTokenHeaders } from './APIFunctions';

const url = "http://127.0.0.1:8000/api/v1/pools/"

export const ShowAllPools = ({handleSelectPool}) => {
    const [pools, dispatchPools] = React.useReducer(
        poolsReducer, {data: [], isLoading: false, isError: false}
    )

    const handleFetchPools = useCallback(async() =>{
        dispatchPools({type: 'POOLS_FETCH_INIT'})

        try{
            const result = await axios.get(url, getTokenHeaders())
            dispatchPools({
                type: 'POOLS_FETCH_SUCCESS',
                payload: result.data,
                
            })
            console.log(result)
        }catch(e){
            console.log(e)
            dispatchPools({type: 'POOLS_FETCH_FAILURE'})
        }

    }, [])

    React.useEffect(() => {
        handleFetchPools()
    }, [handleFetchPools])
    

    return (
        <div>
            <h2 className='pools-heading'>Pick a Pool</h2>
            <ul className='no-bullet'>
                {pools.isError &&<p>Something went wrong...</p>}
            
                {pools.isLoading ? (<p>Loading...</p>):
                pools.data.map(pool =>(
                    <li key={pool.id}>
                        <button 
                        className='pool-button'

                        // This is how you pass data into 
                        onClick={() => handleSelectPool(pool.id)}
                        >
                            {pool.pool_name}
                        </button>
                    </li>
                )).reverse()}
            </ul>
        </div>
    )
} 