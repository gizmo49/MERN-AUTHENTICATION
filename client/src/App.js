import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import axios from 'axios'
import Home from './Components/Home'
import Events from './Components/Events'
import Login from './Components/Login'
import Logout from './Components/Logout'
import NotFound from './Components/NotFound'

import './App.css';
//import Logout from './Components/Logout';
const Cookies = require('js-cookie');
class App extends Component {
    constructor(){
        super();
        this.state = {auth:false}

    }
    
    componentDidMount(){
        const accesstoken = Cookies.get('x-access-token');
        const url =  `http://localhost:3027/users/verify`;
        axios.post(url,{accesstoken})
            .then((res) => {
                //console.log(res.data.id);
                this.setState({auth:true});
            
            }).catch((err) => {
                console.log('something went wrong');
             //   this.props.history.push("/login");
            })
        
        }
      
        render(){
            return(
                <Router>
                <div>
                <header className="header">
                    <nav className="navbar container">
                        <div className="navbar-brand">
                            <Link to="/">
                                <span className="navbar-item">Home</span>
                            </Link>
                        </div>
    
                        <div className="navbar-end">
                            <Link to="/events">
                                <span style={{padding:'24px'}} className="navbar-item">Events</span>
                            </Link>
                          
                              <Link to="/login">
                                <span className={ (this.state.auth ? 'hidden' : 'navbar-item')}>Login</span>
                            </Link>
                            <Link to="/logout">
                                <span className={ (this.state.auth ? 'navbar-item' : 'hidden')}>Logout</span>
                            </Link>
                        </div>
                    </nav>
                </header>
                    <section className="content">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/events" component={Events} />
                            <Route path="/login" component={Login} />
                            <Route path="/logout" component={Logout} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </section>
                </div>
            </Router>
            )
        }
}

export default App;
