import './static/style/App.css';
// import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useContext} from 'react'
// import { ShowAllPools } from './ShowAllPools';
import { Routes, Router, Route, Link, useNavigate } from 'react-router-dom';
import { MainMenu } from './MainMenu';
// import { NewPoolForm } from './Pools/NewPoolForm';
import { PoolForm } from './Pools/PoolForm';
import { CreateAccount } from './Account/CreateAccount';
import {Login} from './Account/Login'
import { PickWinners } from './Winners/PickWinners';
import { ShowLeagues } from './League/ShowLeagues';
import { NewLeagueForm } from './League/NewLeagueForm';
import {LeagueDetails} from './League/LeagueDetails'
import { MakePicks } from './Picks/MakePicks';
import AuthenticationContext from './Context/AuthenticationContext';



const App = () => {
  const {user, authToken, logoutUser} = useContext(AuthenticationContext)
 
  
  // Controls whether login or logout is displayed in top right
  const loginOrLogout = () => {
    if(!user){
      return <Link to="login"><span id='login'>Login</span></Link>
    }else{
      return <Link to=""><span onClick={logoutUser} id='login'>Logout</span></Link>
    }
  }

  // Controls Whether create account or 'Hello User' is displayed in top left
  const GreetingOrCreate = () =>{
    if(!user){
      return <Link to="create-account"><span id='create-account'>Create Account</span></Link>
    }else{
      return <span id="create-account">Hello {user.first_name}!</span>
    }
  }

  return(
  <>
  <div className='container'>
    {GreetingOrCreate()} 
    <Link to="/"><h1 className='heading'>Football Pool</h1></Link>
    {loginOrLogout()}
    
      <Routes>        
          <Route path="/" element={<MainMenu />}/>
          {/* <Route path="/new-pool" element={<NewPoolForm />} /> */}
          <Route path="/pool-form" element={<PoolForm />} />
          <Route path="/make-picks" element={<MakePicks/>} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login/>} />
          <Route path='/pick-winners' element={<PickWinners/>}/>
          <Route path='/leagues' element={<ShowLeagues/>}/>
          <Route path='/leagues/new-league' element={<NewLeagueForm/>}/>
          <Route path='/leagues/league-details' element={<LeagueDetails/>}/>  
      </Routes>
    </div>
  </>
  )
}

export default App;
