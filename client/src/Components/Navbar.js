import React, { Component } from 'react';
import {

    Link
  } from 'react-router-dom';

class Navbar extends Component{
   
    constructor(){
        super();
        this.state = {auth:false};
    }
  
    render(){
      return (
        <div>
        <header className="header">
            <nav className="navbar container">
                <div className="navbar-brand">
                    <Link to="/">
                        <span className="navbar-item">Home </span>
                    </Link>
                </div>

                <div className="navbar-end">
                    <Link to="/events">
                        <span style={{padding:'24px'}} className="navbar-item">Events</span>
                    </Link>
                    
                        <Link to="/login">
                        <span className={ (this.props.authstatus ? 'hidden' : 'navbar-item')}>Login</span>
                    </Link>
                    
                 <a href="#" onClick={this.props.updateauth} className={ (this.props.authstatus ? 'navbar-item' : 'hidden')} >Logout</a>
                    
                </div>
            </nav>
        </header>
        </div>
        )
    }
}

export default Navbar;
