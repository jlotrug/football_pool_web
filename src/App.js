import './App.css';
// import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
// import { ShowAllPools } from './ShowAllPools';
import { Routes, Router, Route, Link } from 'react-router-dom';
import { MainMenu } from './MainMenu';
import { NewPoolForm } from './NewPoolForm';
import { MakePicksForm } from './MakePicksForm';
import { CreateAccount } from './CreateAccount';


const App = () => {

  return(
  <>
  <div className='container'>
  <Link to="create-account"><span id='create-account'><a>Create Account</a></span></Link>
    <Link to="/"><h1 className='heading'>Football Pool</h1></Link>
    <Link><span id='login'><a>Login</a></span></Link>
      <Routes>
        <Route path="/" element={<MainMenu />}/>
        <Route path="/new-pool" element={<NewPoolForm />} />
        <Route path="/make-picks" element={<MakePicksForm />} />
        <Route path="/create-account" element={<CreateAccount />} />



      </Routes>
    </div>
  </>
  )
}

export default App;
