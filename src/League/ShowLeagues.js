import React, {useCallback, useContext} from "react"
import '../static/style/League.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { LeagueReducer } from "../Reducers/LeagueReducer"
import { FetchData } from '../API/FetchData';
import AuthenticationContext from "../Context/AuthenticationContext";

const fetchLeaguesUrl = process.env.REACT_APP_SEVER_URL + "/api/v1/leagues/"

export const ShowLeagues = () => {
    const {authTokens} = useContext(AuthenticationContext)
    const [leagues, dispatchLeagues] = React.useReducer(
        LeagueReducer, {data: [], isLoading: false, isError: false}
    )

    const handleFetchLeagues = useCallback(() =>{
        FetchData(fetchLeaguesUrl, dispatchLeagues, 'LEAGUE', authTokens.access)
    }, [])

    React.useEffect(() => {
        handleFetchLeagues()
    }, [handleFetchLeagues])

    return (
        <div>
            <Link to={!!authTokens ? "new-league" : "/"}>
                <Button 
                    size="lg" 
                    variant="outline-dark" 
                    className= "button-style league-button"
                    >
                    Start New League
                </Button>
            </Link>            
              <h2 className='context-heading'>Your Leagues</h2>
            <ul className='no-bullet'>
                {leagues.isError &&<p>Something went wrong...</p>}            
                {leagues.isLoading ? (<p>Loading...</p>):

                leagues.data.map(league =>(
                    <Link key={league.id} to={!!authTokens ? {pathname:"league-details"} : "/"} state={{league:league}}>
                        <li key={league.id}>                        
                            <button className='pool-button'>{league.league_name}</button>
                        </li>
                    </Link>
                )).reverse()}
            </ul>
        </div>
    )
}