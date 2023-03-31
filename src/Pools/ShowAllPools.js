import React, { useCallback} from 'react'
import '../static/style/MakePicksFormStyle.css'
import { poolsReducer} from '../Reducers/GamePoolReducers';
import axios from 'axios';
import { GetTokenHeaders } from "../API/GetTokenHeaders"

const url = "http://127.0.0.1:8000/api/v1/pools/"

export const ShowAllPools = ({handleSelectPool}) => {
    const [pools, dispatchPools] = React.useReducer(
        poolsReducer, {data: [], isLoading: false, isError: false}
    )

    const handleFetchPools = useCallback(async() =>{
        dispatchPools({type: 'POOLS_FETCH_INIT'})

        try{
            const result = await axios.get(url, GetTokenHeaders())
            dispatchPools({
                type: 'POOLS_FETCH_SUCCESS',
                payload: result.data,
                
            })
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