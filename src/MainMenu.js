import './static/style/App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthenticationContext from './Context/AuthenticationContext';

const logout = process.env.REACT_APP_SEVER_URL + "/api/v1/dj-rest-auth/logout/"

export const MainMenu = ({loggedout}) => {
  const [warning, setwarning] = React.useState("")
  let {user} = useContext(AuthenticationContext)

  // If not logged in, displays message to user and does not continue
  const handleLoginWarning = () => {
    if(!user) setwarning("Please login or create an account to continue")
  }

  return (
    <div className="">
      <div className="button-container">        
        <Link to={!!user ? "leagues" : "/"}>
            <Button 
            size="lg" 
            variant="outline-dark" 
            className= "button-style"
            onClick={handleLoginWarning}
            >
            My Leagues
            </Button>
        </Link>

        <Link to={!!user ? "make-picks" : "/"}>
            <Button 
            size="lg" 
            variant="outline-dark" 
            className="button-style"
            onClick={handleLoginWarning}
            >
            Make Picks
            </Button>
        </Link>
        {/* <Link to={!!user ? 'pick-winners' : '/'}>
          <Button
           size="lg" 
           variant="outline-dark" 
           className="button-style"
           onClick={handleLoginWarning}
          >
            Pick Winners
          </Button>

        </Link> */}
        
        </div>
        <span className='please-login'>{warning}</span>
    </div>
  );
}