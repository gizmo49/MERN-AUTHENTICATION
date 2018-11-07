import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Navbar from './Navbar';
import { error } from 'util';
const Logouturl = `http://localhost:3027/users/logout`;



class Events extends Component {
  constructor(){
    super();
    this.state = {auth: "false", fullname: ""};
  }
  componentWillMount(){
    const accesstoken = Cookies.get('x-access-token');
    const url =  `http://localhost:3027/users/verify`;
  //  const getuser = `http://localhost:3027/users/verify`;
    axios.post(url,{accesstoken})
        .then((res) => {
          console.log(res.data.id);
          this.setState({fullname: res.data.fullname});
        
        
        }).catch((err) => {
            console.log('something went wrong');
            this.props.history.push("/login");
        })
   
    }
    LoguserOut(e){
      axios.get(Logouturl)
      .then((res) => {
        Cookies.remove('x-access-token');
        console.log('deleting the users');
        this.setState({auth:false});
        this.props.history.push("/");
        this.forceUpdate();
      
      }).catch((err) => {
          //comsole.log('so')
            console.log('something went wrong');
         
      })
    }
  render() {
    return (
        <div className="container">
        <div>
         <Navbar updateauth={this.LoguserOut.bind(this)} authstatus={ this.state.auth }></Navbar>          
        </div>
          <div>
         <h1>Events Page</h1>
         <h1>Welcome {this.state.fullname}</h1>
        </div>
         </div>
    
    );
  }
}

export default Events;
