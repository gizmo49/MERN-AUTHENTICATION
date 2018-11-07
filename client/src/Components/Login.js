import React, { Component } from 'react';
import axios from 'axios';
const Cookies = require('js-cookie');
const appurl = `http://localhost:3027/users/login`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  handleChange(event) {

    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    //console.log('go called');


  
   axios.post(appurl, {
    email: this.state.email,
    password: this.state.password
    }).then(res => {
        console.log('log in success setting cookies');
      Cookies.set('x-access-token', res.data.token);
    }).catch((err) =>{
        console.log(`An error occured ${err}`);

    })

      
  }

  render() {
    return (
      <div className="container">
       <form className="form-signin" onSubmit={this.handleSubmit}> 
          <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
         
          <input  onChange={this.handleChange} type="email" name="email"  className="form-control" placeholder="username@domain.com"/>
         
          <input onChange={this.handleChange} type="password" name="password" className="form-control" placeholder="Enter your Password"/>


        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
          {/* <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p> */}
        </form>
       </div>
    
    );
  }
}

export default Login;
