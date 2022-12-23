import './App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NewPoolForm } from './NewPoolForm';
import React from 'react'

const App = () => {
  const [newGameClass, setNewGameClass] = React.useState("hide-element")
  const [buttonClass, setButtonClass] = React.useState("button-container")

  const handleNewPoolClick = () => {
    setButtonClass("hide-element")
    setNewGameClass("")
  }

  const handleMakePicksClick = () => {
    setButtonClass("hide-element")
  }

  const handleHeadingClick = () => {
 
    setButtonClass('button-container')
    setNewGameClass("hide-element")
    // New picks class needs to be added once it's funtional
  }

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
      <NewPoolForm formClass ={newGameClass}/>
    </div>
  );
}

export default App;
