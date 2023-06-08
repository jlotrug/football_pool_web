import Button from 'react-bootstrap/Button'

export const DisplayActivePlayers = ({poolDetailsState, handleSelectedPlayer}) => {


    return (
        <>
            <h1>Active Players</h1>

            <ul className='no-bullet'>
                {poolDetailsState.isError &&<p>Something went wrong...</p>}
            
                {poolDetailsState.isLoading ? (<p>Loading...</p>):
                poolDetailsState.players.map(player =>(

                    <li key={player.id}>
                        <Button 
                            className='button-style player-button'
                            size='lg'
                            variant='outline-dark'
                            onClick={() => handleSelectedPlayer(player)}
                        >
                            {player.first_name} {player.last_name}
                        </Button>
                    </li>
                ))}
            </ul>                    
        </>
    )
}