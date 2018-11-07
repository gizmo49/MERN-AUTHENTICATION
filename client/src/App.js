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
import NotFound from './Components/NotFound'

import './App.css';
const Logouturl = `http://localhost:3027/users/logout`;
const Cookies = require('js-cookie');

class App extends Component {
    constructor(){
        super();
        this.state = {pal:'false'}
    }
   
        render(){
            return(
                <Router>
                <div>
                  
                    <section className="content">
                        <Switch>
                            <Route exact path="/" component={Home}  />
                            <Route path="/events" component={Events} />
                            <Route path="/login" component={Login} />
                          
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </section>
                </div>
            </Router>
            )
        }
}
class Navbar extends Component{
    constructor(){
        super();
        this.state = {auth:false};
    }
    componentDidMount(){
        const accesstoken = Cookies.get('x-access-token');
        const url =  `http://localhost:3027/users/verify`;
        axios.post(url,{accesstoken})
            .then((res) => {
                //console.log(res.data.id);
                this.setState({auth:true});
                
            
            }).catch((err) => {
                console.log(`ERROR: ${err}`);
                this.setState({auth:false});
            
             //   this.props.history.push("/login");
            })
        
        }
   
    componentDidUpdate(){
        console.log('this component updated');
       
        
        
    }
            
   
        HandleLogout(e){
            axios.get(Logouturl)
            .then((res) => {
              Cookies.remove('x-access-token');
              console.log('deleting the users');
              this.setState({auth:false});
              this.props.history.push("/events");
              this.forceUpdate();
            
            }).catch((err) => {
                //comsole.log('so')
                  console.log('something went wrong');
               
            })
        }
      
    render(){
      return (
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
                    
                 <a href="#" onClick={this.HandleLogout.bind(this)} className={ (this.state.auth ? 'navbar-item' : 'hidden')} >Logout</a>
                    
                </div>
            </nav>
        </header>
        </div>
        )
    }
}

export default App;
