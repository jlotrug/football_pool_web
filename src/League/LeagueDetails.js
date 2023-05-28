import { useState } from "react"
import { useLocation } from "react-router-dom"
import {ShowAllPools} from "../Pools/ShowAllPools"


export const LeagueDetails = () => {
    const location = useLocation();
    const [league, setLeague] = useState(location.state.league)


    return(
        <div className="league-details">
            <h1>{league.league_name}</h1>
            <h1>{league.code}</h1>
            <ShowAllPools league_id={league.id}/>

        </div>
    )
}