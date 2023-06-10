import React, {useContext, useEffect, useState} from 'react'
import '../static/style/MakePicksFormStyle.css'
import { poolsReducer} from '../Reducers/GamePoolReducers';
import { FetchData } from '../API/FetchData';
import AuthenticationContext from "../Context/AuthenticationContext";
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { PoolList } from './PoolList';
import { PoolDetails } from './PoolDetails';
import { manageVisibility } from '../HelperMethods';

const fetchLeaguePoolsUrl = process.env.REACT_APP_SEVER_URL + "/api/v1/pools?leagueid="

export const ManagePools = ({league_id, league, setLeagueDetailsClass}) => {
    const [selectedPool, setSelectedPool] = useState(null)
    const [managePoolsMainClass, setmanagePoolsMainClass] = useState('manage-pools-main')
    const [poolDetailsClass, setPoolDetailsClass] = useState('hide-element')
    const [pools, dispatchPools] = React.useReducer(
        poolsReducer, {pools: [], isLoading: false, isError: false}
    )
    const {user, authTokens} = useContext(AuthenticationContext)

    useEffect(() => {
        FetchData(fetchLeaguePoolsUrl+league.id, dispatchPools, 'POOLS', authTokens.access)
    }, [])
    
    const handlePoolSelect = (pool) => {
        manageVisibility(setPoolDetailsClass, 'pool-details', [setmanagePoolsMainClass, setLeagueDetailsClass])
        setSelectedPool(pool)
    }

    return (
        <>
            <div className={managePoolsMainClass}>
                <Link to={!!user ? "/pool-form" : "/"} state={{league_id:league_id, league:league}}>
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
            <div className={poolDetailsClass}>
                {
                    selectedPool && <PoolDetails league_id={league_id} league={league} pool={selectedPool}/>
                }
            </div>
        </>
    )
} 