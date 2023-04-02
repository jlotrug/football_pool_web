import React from "react"
import { LeagueReducer } from "../Reducers/LeagueReducer"

const url = "http://127.0.0.1:8000/api/v1/leagues/"

export const SelectLeague = () => {
    const [leagues, dispatchLeagues] = React.useReducer(
        LeagueReducer, {data: [], isLoading: false, isError: false}
    )


    return (
        <div>

        </div>
    )
}