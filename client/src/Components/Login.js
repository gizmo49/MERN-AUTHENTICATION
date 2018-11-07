import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar'
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
  componentDidMount(){
    const accesstoken = Cookies.get('x-access-token');
    const url =  `http://localhost:3027/users/verify`;
    axios.post(url,{accesstoken})
        .then((res) => {
            //console.log(res.data.id);
            //this.setState({auth:true});
            this.props.history.push("/events");
            
        
        }).catch((err) => {
            console.log(`ERROR: ${err}`);
          //  this.setState({auth:false});
        
         //   this.props.history.push("/login");
        })
    
    }
  handleChange(event) {

    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
   // console.log('got called');


  
   axios.post(appurl, {
    email: this.state.email,
    password: this.state.password
    }).then(res => {
        console.log('log in success setting cookies');
      //  this.setState({auth:true});
      Cookies.set('x-access-token', res.data.token);
      this.props.history.push("/");
    }).catch((err) =>{
        console.log(`An error occured ${err}`);

    })

      
  }

  render() {
    return (
      <div className="container">
      <div>
        <Navbar></Navbar>

      </div>
      <div>
       <form className="form-signin" onSubmit={this.handleSubmit}> 
          <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
         
          <input  onChange={this.handleChange} type="email" name="email"  className="form-control" placeholder="username@domain.com"/>
         
          <input onChange={this.handleChange} type="password" name="password" className="form-control" placeholder="Enter your Password"/>


        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
          {/* <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p> */}
        </form>
        
       </div>
       </div>
    
    );
  }
}

export default Login;
