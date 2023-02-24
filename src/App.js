import './App.css';
// import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
// import { ShowAllPools } from './ShowAllPools';
import { Routes, Router, Route, Link, useNavigate } from 'react-router-dom';
import { MainMenu } from './MainMenu';
import { NewPoolForm } from './NewPoolForm';
import { MakePicksForm } from './MakePicksForm';
import { CreateAccount } from './CreateAccount';
import {Login} from './Login'


const App = () => {
  const [currentUser, setCurrentUser] = React.useState("")

  const handleCurrentUser = (user) => {
    setCurrentUser(user)
  }

  const HandleLogout = () => {
    localStorage['session'] = ""
  }
  
  const loginOrLogout = () => {
    // console.log(localStorage['session'])
    if(!currentUser){
      return <Link to="login"><span id='login'>Login</span></Link>
    }else{
      return <Link to="logout"><span onClick={HandleLogout} id='login'>Logout</span></Link>
    }
  }

  const GreetingOrCreate = () =>{
    if(!currentUser){
      return <Link to="create-account"><span id='create-account'>Create Account</span></Link>
    }else{
      return <span id="create-account">Hello!</span>
    }
  
  }

  return(
  <>
  <div className='container'>
    {GreetingOrCreate()}
  {/* <Link to="create-account"><span id='create-account'>Create Account</span></Link> */}
    <Link to="/"><h1 className='heading'>Football Pool</h1></Link>
    {loginOrLogout()}
    {/* <Link to="login"><span id='login'>Login</span></Link> */}
      <Routes>
        <Route path="/" element={<MainMenu />}/>
        <Route path="/new-pool" element={<NewPoolForm />} />
        <Route path="/make-picks" element={<MakePicksForm />} />
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
