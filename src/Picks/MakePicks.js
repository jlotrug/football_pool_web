import React, {useContext, useEffect, useReducer, useState, useCallback} from 'react'
import { useNavigate } from "react-router-dom";
import '../static/style/MakePicksFormStyle.css'
import { makePicksReducer } from '../Reducers/MakePicksReducer';
import { FetchData } from '../API/FetchData';
import AuthenticationContext from "../Context/AuthenticationContext";
import { PoolList } from '../Pools/PoolList';
import { ShowAllGames } from '../Games/ShowAllGames';

const poolsUrl = "http://127.0.0.1:8000/api/v1/pools?leaguecode="
const gamesUrl = "http://localhost:8000/api/v1/games?poolid="
const userLeaguesUrl = "http://127.0.0.1:8000/api/v1/userleagues/"

export const MakePicks = () => {
    const {authTokens} = useContext(AuthenticationContext)
    const [picksForm, setPicksForm] = useState("hide-element")
    const [poolList, setPoolList] = useState("hide-element")
    const [picksSubmited, setPicksSubmited] = useState("hide-element")
    const [leagueForm, setleagueForm] = useState("")
    const [done, setDone] = React.useState(false)
    const [leagueCode, setLeagueCode] = useState(null)
    const [manualCode, setManualCode] = useState()
    const [allPicksMade, setAllPicksMade] = React.useState(false)
    const [selectedPool, setSelectedPool] = useState(false)
    const [makePicksState, dispatchMakePicksState] = useReducer(
        makePicksReducer, {pools: [], games: [], leagues: [], isLoading: false, isError: false}
    )
    const navigate = useNavigate()

    useEffect(() => {
        FetchData(userLeaguesUrl, dispatchMakePicksState, 'LEAGUES', authTokens.access)
    }, [])

    useEffect(() => {
        if(leagueCode == null) return 
        try{
            FetchData(poolsUrl+leagueCode, dispatchMakePicksState, 'POOLS', authTokens.access)            
        }catch(e){
            console.log(e)
        }
    }, [leagueCode])

    const handleFetchPools = (e) => {
        e.preventDefault()
        setLeagueCode(manualCode)
    }
    const handleLeagueCodeChange = (e) => {
        setManualCode(e.target.value)
    }

    const handleSelectedPool = (pool) => {
        setSelectedPool(pool)
        setPicksForm("picks-form-div")
        setPoolList("hide-element")
        FetchData(gamesUrl+pool.id, dispatchMakePicksState, 'GAMES', authTokens.access)
    }

    const handleDone = () => {
        console.log(allPicksMade)
        if(allPicksMade){
            
            setDone(true)
            setPicksSubmited("")
            setPicksForm("hide-element")
            // navigate("/")
        }
    }
    const resetDone = () =>{
        setDone(false)
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

    return(
        <div className='make-picks'>
            <div className={leagueForm}>
                {/* <form onSubmit={handleFetchPools} >

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
                </form> */}
                <div>
                
                    {(makePicksState.leagues.length >0) && <h2 className='pools-heading'>Your Current Leagues</h2> }
                    {/* {console.log(makePicksState.leagues.length)} */}
                    <ul className='no-bullet'>
                        {makePicksState.leagues.isError &&<p>Something went wrong...</p>}
                
                        {makePicksState.leagues.isLoading ? (<p>Loading...</p>):
                            makePicksState.leagues.map(league =>(
                                <li key={league.id}>                                    
                                    <button 
                                        className='pool-button'
                                        value={league.code}
                                        onClick={() => setLeagueCode(league.code)}
                                    >
                                        {league.league_name}
                                        <h5 className='league-button-code'>{league.code}</h5>
                                    </button>
                                </li>
                    )).reverse()}
                    </ul>
                    
                </div>
                
                 <form onSubmit={handleFetchPools} >

                    <h2 className='pools-heading'>Join New League</h2>
                    <input
                    type="text"
                    onChange={handleLeagueCodeChange}
                    placeholder='Enter League Code'    
                    >
                    </input> <br/>
                    <span className='get-league-submit'>
                        <input 
                        type="submit" 
                        value="Join"
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

                    <ShowAllGames
                        pool={selectedPool}
                        games={makePicksState.games}
                        triggerDone={done}
                        resetDone={resetDone}
                        handleAllPicksMade = {handleAllPicksMade}
                    />
                <button className='done-button' onClick={handleDone}>Done</button>
            </div>
            <h2 className={picksSubmited}>Picks Submited!</h2>

        </div>
    )
}