// import { ShowAllPools } from '../Pools/ShowAllPools';
import React, { useState } from 'react';
import { ShowAllGames } from '../Games/ShowAllGames';
import { useNavigate } from 'react-router-dom';


export const PickWinners = () =>{
    const [allPoolsClass, setAllPoolsClass] = React.useState("all-pools")
    const [picksForm, setPicksForm] = React.useState("hide-element")
    const [currentPool, setCurrentPool] = React.useState(false)
    const [done, setDone] = React.useState(false)
    const [allPicksMade, setAllPicksMade] = React.useState(false)
    const navigate = useNavigate();

    const poolSelected = () => {
        setAllPoolsClass("hide-element")
        setPicksForm("picks-form-div")
    }

    const handleSelectPool = (pool) =>{
        poolSelected()
        setCurrentPool(pool)
    }

    const handleDone = () => {
        if(allPicksMade){
            
            setDone(true)
            navigate("/")
        }
    }

    const resetDone = () =>{
        setDone(false)
    }

    // Callback function for ShowAllGames
    // ShowAllGames calls this once all picks have been made for that pool
    // Enables 'Done' button
    const handleAllPicksMade = () =>{
        // setAllPicksMade(true)
        setAllPicksMade(allPicksMade ? false : true)

    }

    return(
        <div className="">
            {/* <div className={allPoolsClass}>
                <ShowAllPools
                    handleSelectPool={handleSelectPool}
                />
            </div> */}
            <div className={picksForm}>
                {currentPool ?
                    <ShowAllGames
                        pool={currentPool}
                        triggerDone={done}
                        resetDone={resetDone}
                        handleAllPicksMade = {handleAllPicksMade}
                    />:
                    <></>
                }
                <button className='done-button' onClick={handleDone}>Done</button>
            </div>
        </div>
    )
}