import './App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

// const logoutUrl = "http://localhost:8080/api/dj-rest-auth/logout/"
const logout = "http://127.0.0.1:8000/api/v1/dj-rest-auth/logout/"

export const MainMenu = ({loggedout}) => {


  return (
    <div className="">
      <div className="button-container">
        <Link to="new-pool">
            <Button 
            size="lg" 
            variant="outline-dark" 
            className= "button-style"
            >
            Start New Pool
            </Button>
        </Link>

        <Link to="make-picks">
            <Button 
            size="lg" 
            variant="outline-dark" 
            className="button-style"
            >
            Make Picks
            </Button>
        </Link>
        
        </div>
    </div>
  );
}