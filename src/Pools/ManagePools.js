import React, {useContext, useEffect, useState} from 'react'
import '../static/style/MakePicksFormStyle.css'
import { poolsReducer} from '../Reducers/GamePoolReducers';
import { FetchData } from '../API/FetchData';
import AuthenticationContext from "../Context/AuthenticationContext";
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { PoolList } from './PoolList';
import { PoolDetails } from './PoolDetails';

const url = "http://127.0.0.1:8000/api/v1/pools?leagueid="

export const ManagePools = ({league_id, hideLeagueInfo}) => {
    const [selectedPool, setSelectedPool] = useState(null)
    const [managePoolsMainClass, setmanagePoolsMainClass] = useState('manage-pools-main')
    const [pools, dispatchPools] = React.useReducer(
        poolsReducer, {pools: [], isLoading: false, isError: false}
    )
    const {user, authTokens} = useContext(AuthenticationContext)

    useEffect(() => {
        FetchData(url+league_id, dispatchPools, 'POOLS', authTokens.access)
    }, [])
    
    const handlePoolSelect = (pool) => {
        hideLeagueInfo()
        setmanagePoolsMainClass('hide-element')
        setSelectedPool(pool)
    }

    return (
        <div>
            <div className={managePoolsMainClass}>
                <Link to={!!user ? "/pool-form" : "/"} state={{league_id:league_id}}>
                    <Button 
                        size="lg" 
                        variant="outline-dark" 
                        className= "button-style add-pool-button"
                    >
                    Add New Pool
                    </Button>
                </Link>
                <PoolList
                    poolsState={pools}
                    handleSelectedPool={handlePoolSelect}
                />
            </div>
            {
                selectedPool && <PoolDetails league_id={league_id} pool={selectedPool}/>

            }

        </div>
    )
} 