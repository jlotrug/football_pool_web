import '../static/style/App.css';
import React from 'react';
import Button from 'react-bootstrap/Button'
import {NewPoolReducer} from '../Reducers/NewPoolReducer'
import { GameForm } from '../Games/NewGameForm';
import { NewGameReducer } from '../Reducers/NewGameReducer';
import { NameForm } from './NameForm';
import { Link } from 'react-router-dom';
import { PutPostData } from '../API/PutPostData';

const gamesUrl = "http://localhost:8000/api/v1/games/"

export const NewPoolForm = ({formClass, handleAllPools, handleAllGames, handleDone}) => {
    // const [submitValue, setSubmitValue] = React.useState('Done')
    const [newGameDisabled, setNewGameDisabled] = React.useState(true)
    const [games, dispatchGame] = React.useReducer(
        NewGameReducer, {data:[], usLoading: false, isError: false}
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
            poolDispatch={dispatchNewPool}
            setNewGameDisabled={setNewGameDisabled}
            newPool = {newPool}
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

