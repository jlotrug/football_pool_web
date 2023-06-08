
export const DisplayScores = ({gamecards}) => {
    return(
        <div>
            <ul className='no-bullet'>
                {
                    gamecards.map(player => {
                        return <li>{player.player_first_name} {player.player_last_name}: {player.wins}</li>
                    })
                }
            </ul>
        </div>
    )
}