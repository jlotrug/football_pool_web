import React, {useCallback, useState} from "react"
import '../static/style/League.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { LeagueReducer } from "../Reducers/LeagueReducer"
import { FetchData } from '../API/FetchData';


const url = "http://127.0.0.1:8000/api/v1/leagues/"

export const ShowLeagues = () => {
    const [selectedLeague, setSelectedLeague] = useState(false)
    const [leagues, dispatchLeagues] = React.useReducer(
        LeagueReducer, {data: [], isLoading: false, isError: false}
    )

    const handleFetchLeagues = useCallback(() =>{
        FetchData(url, dispatchLeagues, 'LEAGUE')
    }, [])

    const handleSelectLeague = (league) =>{
        setSelectedLeague(league)
    }

    React.useEffect(() => {
        handleFetchLeagues()
    }, [handleFetchLeagues])


    return (
        <div>
              <h2 className='pools-heading'>Pick a Pool</h2>
            <ul className='no-bullet'>
                {leagues.isError &&<p>Something went wrong...</p>}
            
                {leagues.isLoading ? (<p>Loading...</p>):
                leagues.data.map(league =>(
                    <li key={league.id}>
                        <button 
                        className='pool-button'

                        // This is how you pass data into 
                        onClick={() => handleSelectLeague(league.id)}
                        >
                            {league.league_name}
                        </button>
                    </li>
                )).reverse()}
            </ul>
            <Link to={!!localStorage['session'] ? "new-league" : "/"}>
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