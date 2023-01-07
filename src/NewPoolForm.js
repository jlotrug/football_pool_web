import './App.css';
import React from 'react';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import {NewPoolReducer} from './NewPoolReducer'
import { GameForm } from './NewGameForm';
import { GamesReducer } from './GamesReducer';
import { NameForm } from './NameForm';
import { Link } from 'react-router-dom';

const poolUrl = "http://localhost:8080/api/pools/"
const gamesUrl = "http://localhost:8080/api/games/"

export const NewPoolForm = ({formClass, handleAllPools, handleAllGames, handleDone}) => {
    // const [submitValue, setSubmitValue] = React.useState('Done')
    const [newGameDisabled, setNewGameDisabled] = React.useState(true)
    const [games, dispatchGame] = React.useReducer(
        GamesReducer, {data:[], usLoading: false, isError: false}
    )
    const [newPool, dispatchNewPool] = React.useReducer(
        NewPoolReducer, {data: {}, isLoading: false, isError: false}
    )
    
    const handleNameSubmit = (poolName) => {
            newPoolCreate(poolName)
    }

    const newPoolCreate = async(poolName) => {
        setNewGameDisabled(false)

        dispatchNewPool({type: 'NEW_POOL_INIT'})

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

    const createNewGame = async() =>{

        dispatchGame({type: 'CREATE_GAME_INIT'})

        try{
            const result = await axios.post(gamesUrl, {
                pool: newPool.data.id,
            })
            dispatchGame({
                type: 'CREATE_GAME_SUCCESS',
                payload: [...games.data, result.data]
            })
        }catch{
            dispatchGame({type: 'CREATE_GAME_FAILURE'})
        }
    }

    return(
        <div className="">
            <NameForm 
            handleCallback={handleNameSubmit} 
            poolDispatch={dispatchNewPool}
            poolId = {newPool.data.id}
            />
            <div>
                <ul className='no-bullet'>
                    {games.data.map(game => {
                       const id = game.id
                       // Passes id down as a prop so it can be accessed
                    return <GameForm 
                            key={id} 
                            gameId={id} 
                            // handleCallback={handleGameSubmit}
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
                <Link to="/">
                    <button 
                    className='done-button' 
                    onClick={handleDone}
                    >
                        Done
                    </button>
                </Link>
            </div>
        </div>
    )
}

