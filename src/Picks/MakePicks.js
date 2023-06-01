import React, {useContext, useEffect, useReducer, useState} from 'react'
import '../static/style/MakePicksFormStyle.css'
import { makePicksReducer } from '../Reducers/MakePicksReducer';

import { FetchData } from '../API/FetchData';
import AuthenticationContext from "../Context/AuthenticationContext";
import { PoolList } from '../Pools/PoolList';
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';

const url = "http://127.0.0.1:8000/api/v1/pools?leaguecode="
export const MakePicks = () => {
    const {authTokens} = useContext(AuthenticationContext)
    const [picksForm, setPicksForm] = useState("hide-element")
    const [poolList, setPoolList] = useState("hide-element")
    const [leagueForm, setleagueForm] = useState("")
    const [leagueCode, setLeagueCode] = useState()
    const [makePicksState, dispatchMakePicksState] = useReducer(
        makePicksReducer, {league: null, pool: null, pools: [], games: [], isLoading: false, isError: false}
    )

    const handleFetchPools = (e) => {
        e.preventDefault()
        try{
            FetchData(url+leagueCode, dispatchMakePicksState, 'POOLS', authTokens.access)
            
        }catch(e){
            console.log(e)
        }
    }
    const handleLeagueCodeChange = (e) => {
        setLeagueCode(e.target.value)
    }

    useEffect(() => {
        if(makePicksState.pools.length > 0){
            setleagueForm("hide-element")
            setPoolList("pool-list")
        }
    }, [makePicksState.pools])



    return(
        <div className='make-picks'>
            <div className={leagueForm}>
                <form onSubmit={handleFetchPools} >

                    <label>Enter League Code</label> <br/>
                    <input
                    type="text"
                    onChange={handleLeagueCodeChange}    
                    >
                    </input> <br/>
                    <span className='get-league-submit'>
                        <input 
                        type="submit" 
                        value="Submit"
                        ></input>
                    </span>
                </form>

            </div>
        <div className={poolList}>
            <PoolList poolsState={makePicksState}/>

        </div>

        </div>
    )
}