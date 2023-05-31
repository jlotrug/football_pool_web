import React, { useCallback, useContext} from 'react'
import '../static/style/MakePicksFormStyle.css'
import { poolsReducer} from '../Reducers/GamePoolReducers';
import { FetchData } from '../API/FetchData';
import AuthenticationContext from "../Context/AuthenticationContext";
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const url = "http://127.0.0.1:8000/api/v1/pools?leagueid="

export const ShowAllPools = ({handleSelectPool, league_id, edit}) => {
    const navigate = useNavigate();
    const [pools, dispatchPools] = React.useReducer(
        poolsReducer, {data: [], isLoading: false, isError: false}
    )
    const {user, authTokens} = useContext(AuthenticationContext)

    const handleFetchPools = useCallback(() =>{
        FetchData(url+league_id, dispatchPools, 'POOLS', authTokens.access)
    }, [])

    React.useEffect(() => {
        handleFetchPools()
    }, [handleFetchPools])
    
    const handlePoolSelect = (pool) => {
        if(edit){
            navigate('/pool-form', {replace: true, state: {league_id:league_id, pool: pool, newEdit: true}})
        }

    }

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
                        // onClick={() => handleSelectPool(pool.id)}
                        onClick={() => handlePoolSelect(pool)}
                        >
                            {pool.pool_name}
                        </button>
                    </li>
                )).reverse()}
            </ul>
            {/* <Link to={!!user ? "/new-pool" : "/"} state={{league_id:league_id, pool: false}}> */}
            <Link to={!!user ? "/pool-form" : "/"} state={{league_id:league_id}}>
            <Button 
            size="lg" 
            variant="outline-dark" 
            className= "button-style"
            // onClick={handleLoginWarning}
            >
            Add New Pool
            </Button>
        </Link>
        </div>
    )
} 