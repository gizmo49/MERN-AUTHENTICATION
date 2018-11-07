import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';


class Events extends Component {
  constructor(){
    super();
    this.state = {auth: "false"};
  }
  componentDidMount(){
    const accesstoken = Cookies.get('x-access-token');
    const url =  `http://localhost:3027/users/verify`;
    axios.post(url,{accesstoken})
        .then((res) => {
          console.log(res.data.id);
        
        }).catch((err) => {
            console.log('something went wrong');
            this.props.history.push("/login");
        })
   
    }
  
  render() {
    return (
        <div className="container">

         <h1>Events Page</h1>

         </div>
    
    );
  }
}

export default Events;
