import './App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Link } from 'react-router-dom';

export const MainMenu = () => {

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