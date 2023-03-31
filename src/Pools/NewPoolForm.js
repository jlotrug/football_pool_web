import '../static/style/App.css';
import React from 'react';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import {NewPoolReducer} from '../Reducers/NewPoolReducer'
import { GameForm } from '../Games/NewGameForm';
import { GamesReducer } from '../Reducers/GamesReducer';
import { NameForm } from './NameForm';
import { Link } from 'react-router-dom';
import { GetTokenHeaders } from "../API/GetTokenHeaders"
import { PutPostData } from '../API/PutPostData';

const poolUrl = "http://127.0.0.1:8000/api/v1/pools/"
const gamesUrl = "http://localhost:8000/api/v1/games/"

export const NewPoolForm = ({formClass, handleAllPools, handleAllGames, handleDone}) => {
    // const [submitValue, setSubmitValue] = React.useState('Done')
    const [newGameDisabled, setNewGameDisabled] = React.useState(true)
    const [games, dispatchGame] = React.useReducer(
        GamesReducer, {data:[], usLoading: false, isError: false}
    )
    const [newPool, dispatchNewPool] = React.useReducer(
        NewPoolReducer, {data: [], isLoading: false, isError: false}
    )

    const handlesNewGameClick = () => {
        createNewGame()
    }

    const createNewGame = () => {
        PutPostData(gamesUrl, dispatchGame,'GAME', true, {pool: newPool.data[0].id,}, games.data)
   
    }

    return(
        <div className="">
            {console.log(newPool)}
            <NameForm 
            // handleCallback={handleNameSubmit} 
            poolDispatch={dispatchNewPool}
            setNewGameDisabled={setNewGameDisabled}
            newPool = {newPool}
            // poolId = {newPool.data[0].id}
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
                            poolId = {newPool.data[0].id}
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

