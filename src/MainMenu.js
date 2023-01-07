import './App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NewPoolForm } from './NewPoolForm';
import React from 'react'
// import { ShowAllPools } from './ShowAllPools';
import { MakePicksForm } from './MakePicksForm';
import { Link } from 'react-router-dom';

export const MainMenu = () => {
  const [newGameClass, setNewGameClass] = React.useState("hide-element")
  const [buttonClass, setButtonClass] = React.useState("button-container")
  const [makePicksClass, setMakePicksClass] = React.useState("hide-element")
  // const [allPoolsClass, setAllPicksClass] = React.useState("all-pools")
  // const [picksForm, setPicksForm] = React.useState("hide-element")

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
    // setAllPicksClass("")
    // setMakePicksClass("hide-element")
    // New picks class needs to be added once it's funtional
  }

  // console.log(makePicksClass)
  return (
    <div className="">
      {/* <span id='create-account'><a>Create Account</a></span>
      <h1 className='heading' onClick={handleHeadingClick}>Football Pool</h1>
      <span id='login'><a>Login</a></span> */}
      <div className={buttonClass}>
        <Link to="new-pool">
            <Button 
            size="lg" 
            variant="outline-dark" 
            // onClick={handleNewPoolClick}
            className= "button-style"
            >
            Start New Pool
            </Button>
        </Link>

        <Link to="make-picks">
            <Button 
            size="lg" 
            variant="outline-dark" 
            // onClick={handleMakePicksClick}
            className="button-style"
            >
            Make Picks
            </Button>
        </Link>
        {/* <Button 
        size="lg" 
        variant="outline-dark" 
        onClick={handleMakePicksClick}
        className="button-style"
        >
          Make Picks
        </Button> */}
        </div>
      {/* <NewPoolForm 
      formClass ={newGameClass}
      // Won't need to pass this in real v. Will just fetch this data.
      handleAllPools = {handleAllPools}
      handleAllGames = {handleAllGames}
      handleDone = {showAllPools} 

      />*/}
      {/* <MakePicksForm
        formClass={makePicksClass}
      /> */}
    
      {/*
        May reuse this for an edit option later
      <ShowAllPools allPools={allPools}/> */}
    </div>
  );
}