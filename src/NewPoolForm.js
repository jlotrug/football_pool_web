import './App.css';
import React from 'react';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import {NewPoolReducer} from './NewPoolReducer'
import { GameForm } from './NewGameForm';
import { GamesReducer } from './GamesReducer';
import {Game, Pool} from './MockClasses'
import { NewGameReducer } from './NewGameReducer';

export const NewPoolForm = ({formClass, handleAllPools, handleAllGames, handleDone}) => {
    const [numGames, setNumGames] = React.useState(0)
    const [newGameDisabled, setNewGameDisabled] = React.useState(true)
    const [games, dispatchGame] = React.useReducer(
        GamesReducer, {data:[], usLoading: false, isError: false}
    )
    
    const [newPool, dispatchNewPool] = React.useReducer(
        NewPoolReducer, {data: {}, isLoading: false, isError: false}
    )
    const poolUrl = "http://localhost:8080/api/pools/"
    const gamesUrl = "http://localhost:8080/api/games/"
    

    const createNewGame = async() =>{

        dispatchGame({type: 'CREATE_GAME_INIT'})

        try{
            const result = await axios.post(gamesUrl, {
                pool: newPool.data.id,
            })
            // console.log([...games.data, result.data])
            dispatchGame({
                type: 'CREATE_GAME_SUCCESS',
                payload: [...games.data, result.data]
            })
        }catch{
            dispatchGame({type: 'CREATE_GAME_FAILURE'})
        }
    }


    const handleNameSubmit = async(e) => {
        e.preventDefault()
        setNewGameDisabled(false)

        dispatchNewPool({type: 'NEW_POOL_INIT'})
        
        const poolName = e.target[0].value

        try{
            const result = await axios.post(poolUrl, {
                pool_name: poolName
            })
            dispatchNewPool({
                type: 'NEW_POOL_SUCCESS',
                payload: result.data
            })
        }catch{
            dispatchNewPool({type: 'NEW_POOL_FAILURE'})
        }
    }

    const handlesNewGameClick = () => {
        createNewGame()
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
                    {games.data.map(game => {
                       const id = game.id
                       // Passes id down as a prop so it can be accessed
                    return <GameForm 
                            key={id} 
                            gameId={id} 
                            handleCallback={handleGameSubmit}
                            poolId = {newPool.data.id}
                            />
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

