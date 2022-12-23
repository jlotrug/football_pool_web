import './App.css';
import React from 'react';
import Button from 'react-bootstrap/Button'


class Game{
    constructor(id, teamOne="", teamTwo=""){
        this.teamOne = teamOne;
        this.teamTwo = teamTwo;
        this.id = id;
    }

    setTeamOne(name){
        this.teamOne = name;
    }

    setTeamTwo(name){
        this.teamTwo = name
    }

    getGameId(){
        return this.id;
    }
}

export const NewPoolForm = ({formClass}) => {
    const [games, setGames] = React.useState([])
    const [newGameDisabled, setNewGameDisabled] = React.useState(true)

    // Temp to handle keys 
    const [gameId, setGameId] = React.useState(0);

    const handleNameSubmit = (e) => {
        e.preventDefault()
        handleNewGameDisabled();
    }

    const handleNewGameDisabled = () => {
        newGameDisabled ? setNewGameDisabled(false) : setNewGameDisabled(true)
    }

    const handlesNewGameClick = () => {
        handleNewGameDisabled();
        setGames([...games, new Game(gameId)])
        setGameId(gameId +1);
    }

    const handleGameSubmit = (e) => {
        e.preventDefault();
        handleNewGameDisabled();

    }

    return(
        <div className={formClass}>
            <NameForm handleSubmit={handleNameSubmit}/>
            
            <ul className='no-bullet'>
                {games.map(game => {

                return <GameForm key={game.getGameId()} handleSubmit={handleGameSubmit}/>
                })}
            </ul>

            <Button 
            variant='btn btn-dark' 
            disabled={newGameDisabled}
            onClick={handlesNewGameClick}
            >
                Add Game
            </Button>
        </div>
    )
}

const GameForm = ({handleSubmit}) => {

    return(
        <li>
            <form onSubmit={handleSubmit}>
                <span className='pool-input'>
                    <input type="text"></input> 
                </span>

                <span className='pool-input'>
                    <input type="text"></input>
                </span>

                <span className='pool-input'>
                    <input type="submit" value="Done"></input>
                </span>
            </form>
        </li>
    )
}

const NameForm = ({formClass, handleSubmit}) => {

    return(
        <form onSubmit={handleSubmit} className={formClass}>
            <label>Name</label><br />
            <span className='pool-input'>
                <input type="text" placeholder='eg... Week 14'></input>
            </span>
            <span className='pool-input'>
                <input type="submit" value="Done"></input>
            </span>
        </form>
    )
}

