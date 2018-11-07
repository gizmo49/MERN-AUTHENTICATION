import React, { Component } from 'react';
import axios from 'axios';
const Cookies = require('js-cookie');
const appurl = `http://localhost:3027/users/logout`;

class Logout extends Component {
  
    componentWillMount(){
    
        axios.get(appurl)
            .then((res) => {
              Cookies.remove('x-access-token');
              console.log('deleting the users');
            }).catch((err) => {
                //comsole.log('so')
                  console.log('something went wrong');
               
            })
       
        }
        render(){
            return (
                <p>logout</p>
            )
        }
   
}

export default Logout;
