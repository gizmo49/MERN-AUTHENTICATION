import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
const Cookies = require('js-cookie');
const Logouturl = `http://localhost:3027/users/logout`;
const appurl = `http://localhost:3027/users/signup`;


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      auth:false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    const accesstoken = Cookies.get('x-access-token');
    const url =  `http://localhost:3027/users/verify`;
    axios.post(url,{accesstoken})
        .then((res) => {
         // console.log(res.data.id);
          this.setState({auth:true});
        
        }).catch((err) => {
            console.log('something went wrong');
            this.setState({auth:false});
          //  this.props.history.push("/login");
        })
   
    }
    componentWillMount(){
      console.log('real new mount');
    }
   
  
  handleChange(event) {

    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user =  this.state;
   
    console.log(user);
    console.log(axios)
    axios.post(appurl, { user })
      .then(res => {
        console.log('got a response');
        console.log(res);
        this.props.history.push("/login");

        console.log(res.data);
      }).catch((err) =>{
        console.log(`An error occured ${err}`);

      })

      
  }
  LoguserOut(e){
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

  render() {
    return (
     <div>
       <div>
       <Navbar updateauth={this.LoguserOut.bind(this)} authstatus={ this.state.auth }></Navbar>
       </div>
      <div className={ (this.state.auth ? 'hidden' : 'container')}>
       <form className="form-signin" onSubmit={this.handleSubmit}> 
          <h1 className="h3 mb-3 font-weight-normal">Signup for an Account</h1>
         
          <input  onChange={this.handleChange} type="text" id="fullname" name="fullname" className="form-control" placeholder="Full Name"/>
        
          <input  onChange={this.handleChange} type="email" name="email"  className="form-control" placeholder="Email address"/>
         
          <input onChange={this.handleChange} type="password" name="password" className="form-control" placeholder="Enter A Password"/>


        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
          {/* <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p> */}
        </form>
       </div>
       <div className="container">
        <div  className={ (this.state.auth ? '' : 'hidden')}>
          See list of events, 
          <ul>
            <li>Stuff only Authenticated Users can see</li>
            <li>latest Events</li>
          </ul>
        </div>
        </div>
      </div>
    
    );
  }
}



export default Home;
