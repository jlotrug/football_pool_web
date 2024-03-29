import { useState } from "react";
import { useLocation } from "react-router-dom"
import { ManagePools } from "../Pools/ManagePools"

export const LeagueDetails = () => {
    const location = useLocation();
    const league = location.state.league
    const [leagueInfoClass, setLeagueDetailsClass] = useState('league-details')

    return(
        <div className='league-details'>
            <div className={leagueInfoClass}>
                <h1>{league.league_name}</h1>
                <h1>{league.code}</h1>
            </div>
            <ManagePools league={league} setLeagueDetailsClass={setLeagueDetailsClass}/>
        </div>
    )
}