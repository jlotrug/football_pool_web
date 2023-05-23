import './static/style/App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Link } from 'react-router-dom';

const logout = "http://127.0.0.1:8000/api/v1/dj-rest-auth/logout/"

export const MainMenu = ({loggedout}) => {
  const [warning, setwarning] = React.useState("")

  // If not logged in, displays message to user and does not continue
  const handleLoginWarning = () => {
    if(localStorage['session'] == "") setwarning("Please login or create an account to continue")
  }

  return (
    <div className="">
      <div className="button-container">
        
        {/* <Link to={!!localStorage['session'] ? "new-pool" : "/"}>
            <Button 
            size="lg" 
            variant="outline-dark" 
            className= "button-style"
            onClick={handleLoginWarning}
            >
            Start New Pool
            </Button>
        </Link> */}
        <Link to={!!localStorage['session'] ? "leagues" : "/"}>
            <Button 
            size="lg" 
            variant="outline-dark" 
            className= "button-style"
            onClick={handleLoginWarning}
            >
            My Leagues
            </Button>
        </Link>

        <Link to={!!localStorage['session'] ? "make-picks" : "/"}>
            <Button 
            size="lg" 
            variant="outline-dark" 
            className="button-style"
            onClick={handleLoginWarning}
            >
            Make Picks
            </Button>
        </Link>
        <Link to={!!localStorage['session'] ? 'pick-winners' : '/'}>
          <Button
           size="lg" 
           variant="outline-dark" 
           className="button-style"
           onClick={handleLoginWarning}
          >
            Pick Winners
          </Button>

        </Link>
        
        </div>
        <span className='please-login'>{warning}</span>
    </div>
  );
}