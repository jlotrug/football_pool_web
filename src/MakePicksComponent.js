import React from 'react'
import './MakePicksFormStyle.css'
import { ShowAllPools } from './ShowAllPools';
import { ShowAllGames } from './ShowAllGames';


export const MakePicksComponent = ({formClass}) => {
    const [allPoolsClass, setAllPoolsClass] = React.useState("all-pools")
    const [picksForm, setPicksForm] = React.useState("hide-element")
    const [currentPool, setCurrentPool] = React.useState(false)
    const [done, setDone] = React.useState(false)
    
    React.useEffect(() => {
        setAllPoolsClass("all-pools")
        setPicksForm("hide-element")
    }, [formClass])

    // Hides list of pools and shows div with Pool Form
    const poolSelected = () => {
        setAllPoolsClass("hide-element")
        setPicksForm("picks-form-div")
    }
 
    const handleSelectPool = (pool) =>{
        poolSelected()
        setCurrentPool(pool)
    }


    const handleDone = () => {
        setDone(true)
    }

    const resetDone = () =>{
        setDone(false)
    }

    return(
        <div className={formClass}>
            <div className={allPoolsClass}>
                <ShowAllPools
                    handleSelectPool={handleSelectPool}
                />
            </div>
            <div className={picksForm}>
                {currentPool ?
                    <ShowAllGames
                        pool={currentPool}
                        triggerDone={done}
                        resetDone={resetDone}
                    />:
                     <></>
                }
                <button className='done-button' onClick={handleDone}>Done</button>
            </div>
        </div>
    )
}

