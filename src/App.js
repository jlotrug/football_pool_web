import './static/style/App.css';
// import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
// import { ShowAllPools } from './ShowAllPools';
import { Routes, Router, Route, Link, useNavigate } from 'react-router-dom';
import { MainMenu } from './MainMenu';
import { NewPoolForm } from './Pools/NewPoolForm';
import { MakePicksComponent } from './Picks/MakePicksComponent';
import { CreateAccount } from './Account/CreateAccount';
import {Login} from './Account/Login'


const App = () => {
  const [currentUser, setCurrentUser] = React.useState(localStorage['user'])

  // Sets current user in local storage and state
  const handleCurrentUser = (user) => {
    setCurrentUser(user)
    localStorage['user'] = user
  }

  // Clears localStorage when logging out
  const HandleLogout = () => {
    localStorage.clear()
  }
  
  // Controls whether login or logout is displayed in top right
  const loginOrLogout = () => {
    if(localStorage['session'] === ""){
      return <Link to="login"><span id='login'>Login</span></Link>
    }else{
      return <Link to="logout"><span onClick={HandleLogout} id='login'>Logout</span></Link>
    }
  }

  // Controls Whether create account or 'Hello User' is displayed in top left
  const GreetingOrCreate = () =>{
    if(!currentUser){
      return <Link to="create-account"><span id='create-account'>Create Account</span></Link>
    }else{
      return <span id="create-account">Hello {currentUser}!</span>
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
        <Route path="/new-pool" element={<NewPoolForm />} />
        <Route path="/make-picks" element={<MakePicksComponent />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login handleCurrentUser={handleCurrentUser}/>} />
        <Route path='/logout' element={<Logout handleCurrentUser={handleCurrentUser}/>} />

      </Routes>
    </div>
  </>
  )
}

const Logout = ({handleCurrentUser}) => {

  const navigate = useNavigate()
  
  React.useEffect( () => {
    handleCurrentUser("")
    localStorage['session'] = ''
    navigate('/')

  }, [])
}

export default App;
