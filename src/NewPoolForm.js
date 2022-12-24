import './App.css';
import React from 'react';
import Button from 'react-bootstrap/Button'

class Pool{
    constructor(name, poolId){
        this.name = name;
        this.poolId = poolId;
    }

    getName(){
        return this.name;
    }
}

class Game{
    constructor(id, poolId, teamOne="", teamTwo=""){
        this.teamOne = teamOne;
        this.teamTwo = teamTwo;
        this.id = id;
        this.poolId = poolId
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


export const NewPoolForm = ({formClass, handleAllPools, handleAllGames, handleDone}) => {
    const [games, setGames] = React.useState([])
    const [newGameDisabled, setNewGameDisabled] = React.useState(true)
    const [poolId, setPoolId] = React.useState(0) // Eventually this will be set by the Pool name submission

    // Temp to handle keys 
    const [gameId, setGameId] = React.useState(0);


    const handleNameSubmit = (e) => {
        e.preventDefault()
        setNewGameDisabled(false)
        
        // Will eventually be the returned poolId
        setPoolId(poolId + 1)

        const poolName = e.target[0].value

        const newPool = new Pool(poolName, poolId)
        handleAllPools(newPool);
    }


    const handlesNewGameClick = () => {
        setGames([...games, new Game(gameId, poolId)])
        setGameId(gameId +1);
    }

    const handleGameSubmit = (e) => {
        e.preventDefault();

        const teamOne = e.target[1].value
        const teamTwo = e.target[2].value
        const game = games.find(g => g.gameId = e.target[0].value)


        game.setTeamOne(teamOne)
        game.setTeamTwo(teamTwo)

        handleAllGames(game)

    }

    return(
        <div className={formClass}>
            <NameForm handleCallback={handleNameSubmit}/>
            <div>
                
                <ul className='no-bullet'>
                    {games.map(game => {
                       const id = game.getGameId()
                       // Passes id down as a prop so it can be accessed
                    return <GameForm key={id} gameId={id} handleCallback={handleGameSubmit}/>
                    })}
                </ul>

                <Button 
                variant='btn btn-dark' 
                disabled={newGameDisabled}
                onClick={handlesNewGameClick}
                >
                    Add Game
                </Button><br/>
                <button className='done-button' onClick={handleDone}>Done</button>
            </div>
        </div>
    )
}

const GameForm = ({handleCallback, gameId}) => {
    const [inputHidden, setInputHidden] = React.useState(false)
    const [submitValue, setSubmitValue] = React.useState('Done')
    const [teamOne, setTeamOne] = React.useState("")
    const [teamTwo, setTeamTwo] = React.useState("")

    const handleSubmit = (e) => {
        if(submitValue === 'Done'){
            setSubmitValue('Edit')
            setInputHidden(true)
            handleCallback(e)
        }else{
            setSubmitValue('Done')
            setInputHidden(false)
            e.preventDefault()
        }
    }

    const handleTeamOneChange = (e) => {
        setTeamOne(e.target.value)
    }
    const handleTeamTwoChange = (e) => {
        setTeamTwo(e.target.value)
    }

    return(
        <li>
            <form onSubmit={handleSubmit}>
                <span className='pool-input'>
                    {/* Makes the game id accessible for edits */}
                    <input type="hidden" value ={gameId} ></input> 
                </span>
                <span className='pool-input'>
                    <label className='team-input' hidden={!inputHidden}>{teamOne}</label>
                    <input 
                    type="text" 
                    name='team-one' 
                    hidden={inputHidden} 
                    value={teamOne}
                    onChange={handleTeamOneChange}
                    ></input> 
                </span>

                <span>
                    <label className='input-vs'> vs. </label>
                </span>
                <span className='pool-input'>
                    <label className='team-input' hidden={!inputHidden}>{teamTwo}</label>
                    <input 
                    type="text" 
                    name='team-two' 
                    hidden={inputHidden} 
                    value={teamTwo}
                    onChange={handleTeamTwoChange}
                    ></input>
                </span>

                <span className='pool-input'>
                    <input type="submit" value={submitValue}></input>
                </span>
            </form>
        </li>
    )
}


const NameForm = ({formClass, handleCallback}) => {
    const [formDisabled, setFormDisabled] = React.useState(false)
    const [submitValue, setSubmitValue] = React.useState('Done')

    const handleSubmit = (e) => {
        if(submitValue === 'Done'){
            handleCallback(e)
            setSubmitValue('Edit')
            setFormDisabled(true)
        }else{
            e.preventDefault()
            setSubmitValue('Done')
            setFormDisabled(false)
        }
        // changeAfterSubmit()
        

    }

    // const changeAfterSubmit = () => {
    //     formDisabled ? setFormDisabled(false) : setFormDisabled(true)
    //     submitValue === 'Done' ? setSubmitValue("Edit") : setFormDisabled("Done")
    // }

    return(
        <form onSubmit={handleSubmit} className={formClass}>
            <label>Name</label><br />
            <span className='pool-input'>
                <input disabled={formDisabled} type="text" placeholder='eg... Week 14'></input>
            </span>
            <span className='pool-input'>
                <input type="submit" value={submitValue}></input>
            </span>
        </form>
    )
}

