import React, {useContext, useEffect, useReducer, useState} from 'react'
import '../static/style/MakePicksFormStyle.css'
import { makePicksReducer } from '../Reducers/MakePicksReducer';

import { FetchData } from '../API/FetchData';
import AuthenticationContext from "../Context/AuthenticationContext";
import { PoolList } from '../Pools/PoolList';
import { ShowAllGames } from '../Games/ShowAllGames';
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';

const poolsUrl = "http://127.0.0.1:8000/api/v1/pools?leaguecode="
const gamesUrl = "http://localhost:8000/api/v1/games?poolid="

export const MakePicks = () => {
    const {authTokens} = useContext(AuthenticationContext)
    const [picksForm, setPicksForm] = useState("hide-element")
    const [poolList, setPoolList] = useState("hide-element")
    const [leagueForm, setleagueForm] = useState("")
    const [leagueCode, setLeagueCode] = useState()
    const [allPicksMade, setAllPicksMade] = React.useState(false)
    const [selectedPool, setSelectedPool] = useState(false)
    const [makePicksState, dispatchMakePicksState] = useReducer(
        // makePicksReducer, {league: null, pool: null, pools: [], games: [], isLoading: false, isError: false}
        makePicksReducer, {pools: [], games: [], picks: [], isLoading: false, isError: false}
    )

    const handleFetchPools = (e) => {
        e.preventDefault()
        try{
            FetchData(poolsUrl+leagueCode, dispatchMakePicksState, 'POOLS', authTokens.access)
            
        }catch(e){
            console.log(e)
        }
    }
    const handleLeagueCodeChange = (e) => {
        setLeagueCode(e.target.value)
    }

    const handleSelectedPool = (pool) => {
        setSelectedPool(pool)
        setPicksForm("picks-form-div")
        setPoolList("hide-element")
        FetchData(gamesUrl+pool.id, dispatchMakePicksState, 'GAMES', authTokens.access)

    }

    const handleDone = () => {

    }

    // Callback function for ShowAllGames
    // ShowAllGames calls this once all picks have been made for that pool
    // Enables 'Done' button
    const handleAllPicksMade = () =>{
        // setAllPicksMade(true)
        setAllPicksMade(allPicksMade ? false : true)

    }
    

    useEffect(() => {
        if(makePicksState.pools.length > 0){
            setleagueForm("hide-element")
            setPoolList("pool-list")
        }
    }, [makePicksState.pools])


    // const handleFetchGames = useCallback(() => {
    //     if(!pool) return

    //     FetchData(poolsUrl+pool, dispatchGames, 'GAMES')
    // }, [pool])



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
            <PoolList 
                poolsState={makePicksState}
                handleSelectedPool={handleSelectedPool}
            />

        </div>
        <div className={picksForm}>
                {/* {selectedPool ? */}
                    <ShowAllGames
                        pool={selectedPool}
                        games={makePicksState.games}
                        // triggerDone={done}
                        // resetDone={resetDone}
                        handleAllPicksMade = {handleAllPicksMade}
                    />:
                     {/* <></> */}
                {/* } */}
                <button className='done-button' onClick={handleDone}>Done</button>
            </div>

        </div>
    )
}