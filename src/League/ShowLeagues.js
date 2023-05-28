import React, {useCallback, useState, useContext} from "react"
import '../static/style/League.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { LeagueReducer } from "../Reducers/LeagueReducer"
import { FetchData } from '../API/FetchData';
import AuthenticationContext from "../Context/AuthenticationContext";


const url = "http://127.0.0.1:8000/api/v1/leagues/"

export const ShowLeagues = () => {
    const [selectedLeague, setSelectedLeague] = useState(false)
    const {user, authTokens} = useContext(AuthenticationContext)
    const [leagues, dispatchLeagues] = React.useReducer(
        LeagueReducer, {data: [], isLoading: false, isError: false}
    )

    const handleFetchLeagues = useCallback(() =>{
        FetchData(url, dispatchLeagues, 'LEAGUE', authTokens.access)
    }, [])

    const handleSelectLeague = (league) =>{
        setSelectedLeague(league)
    }

    React.useEffect(() => {
        handleFetchLeagues()
    }, [handleFetchLeagues])


    return (
        <div>
              <h2 className='pools-heading'>Your Leagues</h2>
            <ul className='no-bullet'>
                {leagues.isError &&<p>Something went wrong...</p>}
            
                {leagues.isLoading ? (<p>Loading...</p>):
                leagues.data.map(league =>(
                    <Link key={league.id} to={!!authTokens ? {pathname:"league-details"} : "/"} state={{league:league}}>
                        <li key={league.id}>
                            
                            <button 
                            className='pool-button'

                            // This is how you pass data into 
                            onClick={() => handleSelectLeague(league.id)}
                            >
                                {league.league_name}
                            </button>
                        </li>
                    </Link>
                )).reverse()}
            </ul>
            <Link to={!!authTokens ? "new-league" : "/"}>
            <Button 
            size="lg" 
            variant="outline-dark" 
            className= "button-style league-button"
            >
            Start New League
            </Button>
        </Link>
        </div>
    )
}