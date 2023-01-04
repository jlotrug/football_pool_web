import React from "react";

export const PickForm = ({game, triggerDone, currentPool, resetDone}) => {
    const [selectedPick, setSelectedPick] = React.useState();

    React.useEffect(() => {
        if(!triggerDone) return;
        resetDone();
        
        const pick = {gameId: game.id, pick:selectedPick, poolId: currentPool.id}
        console.log(pick)
    }, [triggerDone, game, currentPool, selectedPick])

    // Tracks the current selection 
    const handleSelection = (e) => {
        console.log(e.target.value)
        setSelectedPick(e.target.value)
    }

    return(
        <li>
            <form className='pick-form'>
                <label className='left-pick'>
                    <input 
                        type="radio"
                        value={game.teamOne}
                        name="game-pick"
                        className='radio-pick'
                        onChange={handleSelection}
                    />
                    {game.team_one}
                </label>
                <label className='right-pick'>
                {game.team_two}
                    <input 
                        type="radio"
                        value={game.teamTwo}
                        name="game-pick"
                        className='radio-pick'
                        onChange={handleSelection}
                    />
                    
                </label>
            </form>
        </li>
    )
}