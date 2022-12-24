import './App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NewPoolForm } from './NewPoolForm';
import React from 'react'
import { ShowAllPools } from './ShowAllPools';
import { MakePicksForm } from './MakePicksForm';


const App = () => {
  const [newGameClass, setNewGameClass] = React.useState("hide-element")
  const [buttonClass, setButtonClass] = React.useState("button-container")
  const [makePicksClass, setMakePicksClass] = React.useState("hide-element")

  // Maybe just for rough draft
  const [allGames, setAllGames] = React.useState([])
  const [allPools, setAllPools] = React.useState([])

  // In real v, will fetch this data. All pools to start. All Games when a pool is chosen
  const handleAllGames = (game) => {
    setAllGames([...allGames, game])
  }

  const showAllPools = () => {
    handleHeadingClick()
  }

  const handleAllPools = (pool) => {
    setAllPools([...allPools, pool])
  }

  const handleNewPoolClick = () => {
    setButtonClass("hide-element")
    setNewGameClass("")
  }

  const handleMakePicksClick = () => {
    setButtonClass("hide-element")
    setMakePicksClass("")
  }

  const handleHeadingClick = () => {
 
    setButtonClass('button-container')
    setNewGameClass("hide-element")
    setMakePicksClass("hide-element")
    // New picks class needs to be added once it's funtional
  }

  // console.log(makePicksClass)
  return (
    <div className="container">
      <h1 className='heading' onClick={handleHeadingClick}>Football Pool</h1>
      <div className={buttonClass}>
        <Button 
        size="lg" 
        variant="outline-dark" 
        onClick={handleNewPoolClick}
        className= "button-style"
        >
          Start New Pool
        </Button>

        <Button 
        size="lg" 
        variant="outline-dark" 
        onClick={handleMakePicksClick}
        className="button-style"
        >
          Make Picks
        </Button>
        </div>
      <NewPoolForm 
      formClass ={newGameClass}
      // Won't need to pass this in real v. Will just fetch this data.
      handleAllPools = {handleAllPools}
      handleAllGames = {handleAllGames}
      handleDone = {showAllPools}

      />
      <MakePicksForm
        formClass={makePicksClass}
      />
    
      {/*
        May reuse this for an edit option later
      <ShowAllPools allPools={allPools}/> */}
    </div>
  );
}

export default App;
